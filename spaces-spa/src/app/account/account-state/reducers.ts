import { createReducer, on } from '@ngrx/store';
import { User } from '../../_models/User';
import {
  autoLogin,
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  register,
  registerError,
  registerSuccess,
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
  
);
