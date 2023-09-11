import { createAction, props } from '@ngrx/store';
import { User } from '../_models/User';

export const login = createAction(
  '[Login Page] Login',
  props<{ userName: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ info: User }>()
);

export const loginError = createAction(
  '[Login Page] Login Error',
  props<{ error: string }>()
);

export const autoLogin = createAction(
  '[Login Page] Auto Login',
  props<{ info: User }>()
);

export const logout = createAction('[Header] Logout');
export const logoutSuccess = createAction('[Header] Logout Success');
export const logoutError = createAction(
  '[Login Page] Logout Error',
  props<{ error: string }>()
);
