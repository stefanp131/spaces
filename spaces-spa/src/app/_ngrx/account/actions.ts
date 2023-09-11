import { createAction, props } from '@ngrx/store';
import { User } from '../../_models/User';
import { Credentials } from 'src/app/_models/Credentials';

export const login = createAction(
  '[Login Page] Login',
  props<{ model: Credentials }>()
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



export const register = createAction(
  '[Register Page] Register',
  props<{ model: Credentials }>()
);

export const registerSuccess = createAction(
  '[Register Page] Register Success and Login',
  props<{ info: User }>()
);

export const registerError = createAction(
  '[Register Page] Register Error',
  props<{ error: string }>()
);