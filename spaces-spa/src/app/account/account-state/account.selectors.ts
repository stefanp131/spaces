import { createSelector } from '@ngrx/store';
import { LikesForPost } from 'src/app/_models/LikesForPost';
import { User } from 'src/app/_models/User';

export interface AccountAppState {
  account: AccountState;
}

export interface AccountState {
  user: User;
}

export const selectSpaces = (state: AccountAppState) => state.account;
export const selectUser = createSelector(
  selectSpaces,
  (state: AccountState) => state.user
);

export const selectLikedByUser = (likedByUsers: LikesForPost[]) =>
  createSelector(selectSpaces, (state: AccountState) =>
    likedByUsers.some(
      (likedByUser) => likedByUser.sourceUserId == state.user.id
    )
  );
