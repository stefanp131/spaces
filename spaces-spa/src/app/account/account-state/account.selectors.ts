import { createSelector } from '@ngrx/store';
import { LikesForComment } from 'src/app/_models/LikesForComment';
import { LikesForPost } from 'src/app/_models/LikesForPost';
import { User } from 'src/app/_models/User';
import { AppState } from 'src/app/app-state';

export interface AccountState {
  user: User;
}

export const selectSpaces = (state: AppState) => state.account;
export const selectUser = createSelector(
  selectSpaces,
  (state: AccountState) => state.user
);

export const selectPostsLikedByUser = (likedByUsers: LikesForPost[]) =>
  createSelector(selectSpaces, (state: AccountState) =>
    likedByUsers.some(
      (likedByUser) => likedByUser.sourceUserId == state.user.id
    )
  );

  export const selectCommentsLikedByUser = (likedByUsers: LikesForComment[]) =>
  createSelector(selectSpaces, (state: AccountState) =>
    likedByUsers.some(
      (likedByUser) => likedByUser.sourceUserId == state.user.id
    )
  );
