import { AccountState } from "./account/account-state/account.selectors"
import { MySpaceState } from "./my-space/my-space-state/my-space.selectors"
import { OurSpaceState } from "./our-space/our-space-state/our-space.selectors";

export interface AppState {
  account: AccountState;
  mySpace: MySpaceState;
  ourSpace: OurSpaceState
}