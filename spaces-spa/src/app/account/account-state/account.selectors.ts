import { createSelector } from '@ngrx/store';
import { LikesForComment } from 'src/app/_models/LikesForComment';
import { LikesForPost } from 'src/app/_models/LikesForPost';
import { User } from 'src/app/_models/User';
import { AppState } from 'src/app/app-state';

export interface AccountState {
  user: User;
  users: User[];
}

export const selectAccount = (state: AppState) => state.account;
export const selectUser = createSelector(
  selectAccount,
  (state: AccountState) => state.user
);

export const selectUsers = createSelector(
  selectAccount,
  (state: AccountState) => state.users
);

export const selectUserWithFollowers = createSelector(
  selectUser,
  selectUsers,
  (user, users) => [
    ...users.map((listUser) => {


      return {
        ...listUser,
        followed:
          listUser.followedByUsers.find(
            (followedByUser) => followedByUser.sourceUserId === +user.id
          ) !== undefined,
      };
    })
  ]
);

export const selectPostsLikedByUser = (likedByUsers: LikesForPost[]) =>
  createSelector(selectAccount, (state: AccountState) =>
    likedByUsers.some(
      (likedByUser) => likedByUser.sourceUserId == state.user.id
    )
  );

export const selectCommentsLikedByUser = (likedByUsers: LikesForComment[]) =>
  createSelector(selectAccount, (state: AccountState) =>
    likedByUsers.some(
      (likedByUser) => likedByUser.sourceUserId == state.user.id
    )
  );
