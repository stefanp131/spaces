import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { toHTML } from 'ngx-editor';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import { User } from 'src/app/_models/User';
import {
  selectLikedByUser, selectUser,
} from 'src/app/account/account-state/account.selectors';
import { AppState } from 'src/app/app-state';
import {
  deletePost,
  toggleLikePost,
} from 'src/app/my-space/my-space-state/my-space.actions';
import {
  deletePost as deletePostOurSpace,
  toggleLikePost as toggleLikePostOurSpace,
} from 'src/app/our-space/our-space-state/our-space.actions';

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
  like$: Observable<boolean>;
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
  constructor(private store: Store<AppState>, private location: Location) {
    this.mySpace = !this.location.path().includes('our-space');
  }

  ngOnInit(): void {
    this.likesCount = this.post.likedByUsers.length;

    this.user$ = this.store.select(selectUser);


    this.like$ = this.store.select(selectLikedByUser(this.post.likedByUsers));
  }

  getHTMLFromValue(post: Post) {
    this._post.content = toHTML(JSON.parse(post.content));
  }

  delete(postId: number) {
    if (this.mySpace) {
      this.store.dispatch(deletePost({ postId }));
    } else {
      this.store.dispatch(deletePostOurSpace({ postId }));
    }
  }

  toggleLike() {
    if (!this.mySpace) {
      this.store.dispatch(
        toggleLikePostOurSpace({
          postId: this.post.id,
          likedByUsers: this.post.likedByUsers,
        })
      );
    } else {
      this.store.dispatch(
        toggleLikePost({
          postId: this.post.id,
          likedByUsers: this.post.likedByUsers,
        })
      );
    }

    this.like = !this.like;
  }
}
