import { createSelector } from '@ngrx/store';
import { LikesForComment } from 'src/app/_models/LikesForComment';
import { LikesForPost } from 'src/app/_models/LikesForPost';
import { User } from 'src/app/_models/User';
import { AppState } from 'src/app/app-state';

export interface AccountState {
  user: User;
  searchUsers: User[];
  followUsers: User[];
}

export const selectAccount = (state: AppState) => state.account;
export const selectUser = createSelector(
  selectAccount,
  (state: AccountState) => state.user
);

export const selectSearchUsers = createSelector(
  selectAccount,
  (state: AccountState) => state.searchUsers
);

export const selectSearchUsersForUser = createSelector(
  selectUser,
  selectSearchUsers,
  (user, users) =>
    [
      ...users.map((listUser) => {
        return {
          ...listUser,
          followed:
            listUser.followedByUsers.find(
              (followedByUser) => followedByUser.sourceUserId === +user.id
            ) !== undefined,
        };
      }),
    ].filter((x) => x.id !== +user.id)
);

export const selectFollowedUsers = createSelector(
  selectAccount,
  (state: AccountState) => state.followUsers
);

export const selectFollowersForUser = createSelector(
  selectUser,
  selectFollowedUsers,
  (user, users) => [
    ...users
      .map((x) => {
        return {
          ...x,
          followed: x.followedByUsers
            .filter((x) => x)
            .flatMap((x) => x.sourceUserId)
            .includes(+user.id),
        };
      })
      .filter((x) => x.id !== +user.id),
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
