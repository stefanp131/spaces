import { createReducer, on } from '@ngrx/store';
import { User } from '../_models/User';
import {
  autoLogin,
  login,
  loginError,
  loginSuccess,
  logout,
  logoutSuccess,
} from './actions';

export enum SpacesStateStatus {
  Pending,
  Loading,
  Error,
  Success,
}

export interface SpacesState {
  user: User;
  error: string;
  status: SpacesStateStatus;
}

export const initialState: SpacesState = {
  user: null,
  error: null,
  status: SpacesStateStatus.Pending,
};

export const spacesReducer = createReducer(
  initialState,
  on(login, (state, { userName, password }) => ({
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
  on(loginError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  }))
);
