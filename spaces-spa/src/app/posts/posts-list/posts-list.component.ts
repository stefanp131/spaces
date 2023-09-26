import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import { CommentsService } from 'src/app/_services/comment.service';
import { LikesService } from 'src/app/_services/likes.service';
import {
  AccountAppState,
} from 'src/app/account/account-state/account.selectors';
import {
  closeHubs,
  getPosts,
  openHubs,
} from 'src/app/my-space/my-space-state/my-space.actions';

import {
  MySpaceAppState,
  selectPosts,
} from 'src/app/my-space/my-space-state/my-space.selectors';
import { getPosts as getPostsOurSpace } from 'src/app/our-space/our-space-state/our-space.actions';
import {
  OurSpaceAppState,
  selectPosts as selectPostsOurSpace,
} from 'src/app/our-space/our-space-state/our-space.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  postList: Observable<Post[]>;
  mySpace = true;

  constructor(
    private ourSpaceStore: Store<OurSpaceAppState>,
    private mySpaceStore: Store<MySpaceAppState>,
    private storeAccount: Store<AccountAppState>,
    private likesService: LikesService,
    private commentService: CommentsService,
    private location: Location
  ) {
    this.mySpace = !this.location.path().includes('our-space');
  }
  ngOnDestroy(): void {
    this.mySpaceStore.dispatch(closeHubs());
  }

  ngOnInit(): void {
    this.mySpaceStore.dispatch(openHubs());

    if (!this.mySpace) {
      this.ourSpaceStore.dispatch(getPostsOurSpace());
      this.postList = this.ourSpaceStore.select(selectPostsOurSpace);
    } else {
      this.mySpaceStore.dispatch(getPosts());
      this.postList = this.mySpaceStore.select(selectPosts);
    }
  }  
}
