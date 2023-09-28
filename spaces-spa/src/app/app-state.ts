import { createAction, props } from "@ngrx/store";
import { AccountState } from "./account/account-state/account.selectors"
import { MySpaceState } from "./my-space/my-space-state/my-space.selectors"
import { OurSpaceState } from "./our-space/our-space-state/our-space.selectors";

export interface AppState {
  account: AccountState;
  mySpace: MySpaceState;
  ourSpace: OurSpaceState
}

export const openHubs = createAction('[Space] Open Hubs');

export const openHubsSuccess = createAction('[Space] Open Hubs Success');

export const openHubsError = createAction(
  '[Space] Open Hubs Error',
  props<{ error: string }>()
);

export const closeHubs = createAction('[Space] Close Hubs');

export const closeHubsSuccess = createAction(
  '[Space] Close Hubs Success'
);

export const closeHubsError = createAction(
  '[Space] Close Hubs Error',
  props<{ error: string }>()
);