import { createSelector } from '@ngrx/store';
import { User } from 'src/app/_models/User';

export interface AccountAppState {
  account: AccountState;
}

export interface AccountState {
  user: User;
}

export const selectSpaces = (state: AccountAppState) => state.account;
export const selectUser = createSelector(
  selectSpaces,
  (state: AccountState) => state.user
);