import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from 'src/app/_models/Post';
import { User } from 'src/app/_models/User';
import {
  AccountState,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { AppState } from 'src/app/app-state';
import { MySpaceState } from 'src/app/my-space/my-space-state/my-space.selectors';

export interface OurSpaceAppState {
  ourSpace: OurSpaceState;
}

export interface OurSpaceState {
  posts: Post[];
  users: User[];
}

export const selectOurSpace = (state: OurSpaceAppState) => state.ourSpace;
export const selectPosts = createSelector(
  selectOurSpace,
  (state: OurSpaceState) =>
    state.posts.slice().sort(sortDescendingByDateUpdated)
);

export const selectUsers = createSelector(
  selectOurSpace,
  (state: OurSpaceState) => state.users
);

export const selectPost = (id: number) =>
  createSelector(selectOurSpace, (state: OurSpaceState) =>
    state.posts.find((post) => post.id === id)
  );

const sortDescendingByDateUpdated = (a, b) =>
  new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime();
