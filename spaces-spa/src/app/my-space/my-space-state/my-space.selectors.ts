import { createSelector } from '@ngrx/store';
import { Post } from 'src/app/_models/Post';

export interface MySpaceAppState {
  mySpace: MySpaceState;
}

export interface MySpaceState {
  posts: Post[];
}

export const selectMySpace = (state: MySpaceAppState) => state.mySpace;
export const selectPosts = createSelector(
  selectMySpace,
  (state: MySpaceState) => state.posts
);