import { createSelector } from '@ngrx/store';
import { User } from '../_models/User';

export interface AppState {
  spaces: SpacesState;
}

export interface SpacesState {
  user: User;
}

export const selectSpaces = (state: AppState) => state.spaces;
export const selectUser = createSelector(
  selectSpaces,
  (state: SpacesState) => state.user
);