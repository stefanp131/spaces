import { createAction, props } from '@ngrx/store';
import { User } from '../../_models/User';
import { Credentials } from 'src/app/_models/Credentials';
import { Profile } from 'src/app/_models/Profile';

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

export const getUserProfile = createAction('[Profile Page] Get Profile');

export const getUserProfileSuccess = createAction(
  '[Profile Page] Get Profile Success',
  props<{ profile: Profile }>()
);

export const getUserProfileError = createAction(
  '[Profile Page] Get Profile Error',
  props<{ error: string }>()
);

export const updateUserProfile = createAction(
  '[Profile Page] Update Profile',
  props<{ profile: Profile }>()
);

export const updateUserProfileSuccess = createAction(
  '[Profile Page] Update Profile Success',
  props<{ profile: Profile }>()
);

export const updateUserProfileError = createAction(
  '[Profile Page] Update Profile Error',
  props<{ error: string }>()
);
