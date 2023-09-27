import { createSelector } from '@ngrx/store';
import { Post } from 'src/app/_models/Post';
import { AppState } from 'src/app/app-state';

export interface MySpaceState {
  posts: Post[];
}

export const selectMySpace = (state: AppState) => state.mySpace;
export const selectPosts = createSelector(
  selectMySpace,
  (state: MySpaceState) => state.posts.slice().sort(sortDescendingByDateUpdated)
);

export const selectPost = (id: number) =>
  createSelector(selectMySpace, (state: MySpaceState) =>
    state.posts.find((post) => post.id === id)
  );


const sortDescendingByDateUpdated = (a,b)=> new Date(b.dateUpdated).getTime()- new Date(a.dateUpdated).getTime();