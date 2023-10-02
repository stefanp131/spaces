import { createReducer, on } from '@ngrx/store';
import { User } from '../../_models/User';
import {
  autoLogin,
  getFollowedUsers,
  getFollowedUsersError,
  getFollowedUsersSuccess,
  getUserProfile,
  getUserProfileSuccess,
  getUsersBySearchTerm,
  getUsersBySearchTermError,
  getUsersBySearchTermSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  register,
  registerError,
  registerSuccess,
  toggleFollowUser,
  toggleFollowUserError,
  toggleFollowUserSuccess,
  updateUserProfile,
  updateUserProfileError,
  updateUserProfileSuccess,
} from './account.actions';
import { SpacesStateStatus } from 'src/app/_models/SpacesStateStatus';
import { FollowedUsers } from 'src/app/_models/FollowedUsers';

export interface AccountState {
  user: User;
  searchUsers: User[];
  followUsers: User[];
  error: string;
  status: SpacesStateStatus;
}

export const initialState: AccountState = {
  user: null,
  searchUsers: [],
  followUsers: [],
  error: null,
  status: SpacesStateStatus.Pending,
};

export const accountReducer = createReducer(
  initialState,
  on(login, (state, { model }) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(loginSuccess, (state, { info }) => ({
    ...state,
    user: info,
    status: SpacesStateStatus.Success,
  })),
  on(autoLogin, (state, { info }) => ({
    ...state,
    user: info,
    status: SpacesStateStatus.Success,
  })),
  on(loginError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),
  on(logout, (state) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    user: null,
    status: SpacesStateStatus.Success,
  })),
  on(logoutError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),
  on(register, (state, { model }) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(registerSuccess, (state, { info }) => ({
    ...state,
    user: info,
    status: SpacesStateStatus.Success,
  })),
  on(registerError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),

  on(getUserProfile, (state) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(getUserProfileSuccess, (state, { profile }) => ({
    ...state,
    user: { ...state.user, aboutMe: profile.aboutMe },
    status: SpacesStateStatus.Success,
  })),
  on(registerError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),

  on(updateUserProfile, (state) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(updateUserProfileSuccess, (state, { profile }) => ({
    ...state,
    user: { ...state.user, aboutMe: profile.aboutMe },
    status: SpacesStateStatus.Success,
  })),
  on(updateUserProfileError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),

  on(getUsersBySearchTerm, (state) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(getUsersBySearchTermSuccess, (state, { users }) => ({
    ...state,
    searchUsers: users,
    status: SpacesStateStatus.Success,
  })),
  on(getUsersBySearchTermError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),
  on(toggleFollowUser, (state) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(toggleFollowUserSuccess, (state, { follow, sourceId, targetId }) => ({
    ...state,
    followUsers: [
      ...state.followUsers.map((listUser) =>
        listUser.id === targetId
          ? {
              ...listUser,
              followedByUsers: !follow
                ? removeFollow(listUser, sourceId, targetId)
                : addFollow(listUser, sourceId, targetId),
            }
          : listUser
      ),
    ],
    searchUsers: [
      ...state.searchUsers.map((user) =>
        user.id === targetId
          ? {
              ...user,
              followedByUsers: !follow
                ? removeFollow(user, sourceId, targetId)
                : addFollow(user, sourceId, targetId),
            }
          : user
      ),
    ],
    status: SpacesStateStatus.Success,
  })),
  on(toggleFollowUserError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),
  on(getFollowedUsers, (state) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(getFollowedUsersSuccess, (state, { users }) => ({
    ...state,
    followUsers: users,
    status: SpacesStateStatus.Success,
  })),
  on(getFollowedUsersError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  }))
);

function addFollow(
  user: User,
  sourceId: number,
  targetId: number
): FollowedUsers[] {
  return [
    ...user.followedByUsers,
    { sourceUserId: sourceId, targetUserId: targetId },
  ];
}

function removeFollow(
  user: User,
  sourceId: number,
  targetId: number
): FollowedUsers[] {
  return user.followedByUsers.filter(
    (followedUser) =>
      followedUser.sourceUserId !== sourceId ||
      followedUser.targetUserId !== targetId
  );
}
