import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { toHTML } from 'ngx-editor';
import { map } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import {
  AccountAppState,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { deletePost } from 'src/app/my-space/my-space-state/my-space.actions';
import { MySpaceAppState } from 'src/app/my-space/my-space-state/my-space.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private _post: Post = {
    id: undefined,
    title: undefined,
    comments: undefined,
    content: undefined,
    dateCreated: undefined,
    dateUpdated: undefined,
    likedByUsers: undefined,
  };

  like = false;
  likesCount = 0;

  @Input() set post(value: Post) {
    this._post = { ...value };
    this.getHTMLFromValue(this._post);
  }

  @Output() onToggleLike = new EventEmitter<{
    like: boolean;
    postId: number;
  }>();

  get post(): Post {
    return this._post;
  }
  constructor(
    private store: Store<MySpaceAppState>,
    private storeAccount: Store<AccountAppState>
  ) {}
  ngOnInit(): void {
    this.likesCount = this.post.likedByUsers.length;

    this.storeAccount
      .select(selectUser)
      .pipe(
        map((user) => {
          if (this.post.likedByUsers.length !== 0) {
            this.like = this.post.likedByUsers.some(
              (likedByUser) => likedByUser.sourceUserId == user.id
            );
          }
        })
      )
      .subscribe();
  }

  getHTMLFromValue(post: Post) {
    this._post.content = toHTML(JSON.parse(post.content));
  }

  delete(postId: number) {
    this.store.dispatch(deletePost({ postId }));
  }

  toggleLike() {
    this.onToggleLike.emit({ like: this.like, postId: this.post.id });
    this.like = !this.like;
    if (this.like) {
      this.likesCount++;
    } else {
      this.likesCount--;
    }
  }
}
