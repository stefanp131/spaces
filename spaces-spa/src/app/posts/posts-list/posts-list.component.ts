import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import { LikesService } from 'src/app/_services/likes.service';
import {
  AccountAppState,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { getPosts } from 'src/app/my-space/my-space-state/my-space.actions';
import {
  MySpaceAppState,
  selectPosts,
} from 'src/app/my-space/my-space-state/my-space.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  postList: Observable<Post[]>;

  constructor(
    private store: Store<MySpaceAppState>,
    private storeAccount: Store<AccountAppState>,
    private likesService: LikesService
  ) {}

  ngOnInit(): void {
    this.storeAccount
      .select(selectUser)
      .pipe(
        map((user) => {
          this.likesService.createHubConnection(user);
        })
      )
      .subscribe();
    this.store.dispatch(getPosts());
    this.postList = this.store.select(selectPosts);
  }

  toggleLike(event: any) {
    this.storeAccount
      .select(selectUser)
      .pipe(
        map((user) => {
          if (!event['like']) {
            this.likesService.like(user.id, event['postId']);
          } else {
            this.likesService.dislike(user.id, event['postId']);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.likesService.stopHubConnection();
  }
}
