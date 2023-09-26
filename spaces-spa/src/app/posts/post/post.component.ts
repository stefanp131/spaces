import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { toHTML } from 'ngx-editor';
import { Observable, Subscription, map } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import { User } from 'src/app/_models/User';
import {
  AccountAppState,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { deletePost } from 'src/app/my-space/my-space-state/my-space.actions';
import { MySpaceAppState } from 'src/app/my-space/my-space-state/my-space.selectors';
import { deletePost as deletePostOurSpace } from 'src/app/our-space/our-space-state/our-space.actions';
import { OurSpaceAppState } from 'src/app/our-space/our-space-state/our-space.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  user$: Observable<User>;
  private _post: Post = {
    id: undefined,
    title: undefined,
    comments: undefined,
    content: undefined,
    dateCreated: undefined,
    dateUpdated: undefined,
    likedByUsers: undefined,
    createdBy: undefined,
  };

  userSelectSubscription: Subscription;

  like = false;
  likesCount = 0;
  mySpace: boolean;

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
    private mySpaceStore: Store<MySpaceAppState>,
    private ourSpaceStore: Store<OurSpaceAppState>,
    private storeAccount: Store<AccountAppState>,
    private location: Location
  ) {
    this.mySpace = !this.location.path().includes('our-space');
  }

  ngOnInit(): void {
    this.likesCount = this.post.likedByUsers.length;
    this.user$ = this.storeAccount.select(selectUser);

    this.user$
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
    if (this.mySpace) {
      this.mySpaceStore.dispatch(deletePost({ postId }));
    } else {
      this.ourSpaceStore.dispatch(deletePostOurSpace({ postId }));
    }
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
