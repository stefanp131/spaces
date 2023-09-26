import { createSelector } from '@ngrx/store';
import { Post } from 'src/app/_models/Post';

export interface OurSpaceAppState {
  ourSpace: OurSpaceState;
}

export interface OurSpaceState {
  posts: Post[];
}

export const selectOurSpace = (state: OurSpaceAppState) => state.ourSpace;
export const selectPosts = createSelector(
  selectOurSpace,
  (state: OurSpaceState) => state.posts.slice().sort(sortDescendingByDateUpdated)
);

export const selectPost = (id: number) =>
  createSelector(selectOurSpace, (state: OurSpaceState) =>
    state.posts.find((post) => post.id === id)
  );


const sortDescendingByDateUpdated = (a,b)=> new Date(b.dateUpdated).getTime()- new Date(a.dateUpdated).getTime();