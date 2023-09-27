import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import { AppState } from 'src/app/app-state';
import {
  closeHubs,
  getPosts,
  openHubs,
} from 'src/app/my-space/my-space-state/my-space.actions';

import {
  selectPosts,
} from 'src/app/my-space/my-space-state/my-space.selectors';
import { getPosts as getPostsOurSpace } from 'src/app/our-space/our-space-state/our-space.actions';
import {
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
    private store: Store<AppState>,    
    private location: Location
  ) {
    this.mySpace = !this.location.path().includes('our-space');
  }
  ngOnDestroy(): void {
    this.store.dispatch(closeHubs());
  }

  ngOnInit(): void {
    this.store.dispatch(openHubs());

    if (!this.mySpace) {
      this.store.dispatch(getPostsOurSpace());
      this.postList = this.store.select(selectPostsOurSpace);
    } else {
      this.store.dispatch(getPosts());
      this.postList = this.store.select(selectPosts);
    }
  }  
}
