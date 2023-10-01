import { createReducer, on } from '@ngrx/store';
import { User } from '../../_models/User';
import {
  autoLogin,
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
  updateUserProfile,
  updateUserProfileError,
  updateUserProfileSuccess
} from './account.actions';
import { SpacesStateStatus } from 'src/app/_models/SpacesStateStatus';

export interface AccountState {
  user: User;
  users: User[];
  error: string;
  status: SpacesStateStatus;
}

export const initialState: AccountState = {
  user: null,
  users: [],
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
    user: { ...state.user, aboutMe: profile.aboutMe},
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
    user: { ...state.user, aboutMe: profile.aboutMe},
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
    users: users,
    status: SpacesStateStatus.Success,
  })),
  on(getUsersBySearchTermError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  }))
);
