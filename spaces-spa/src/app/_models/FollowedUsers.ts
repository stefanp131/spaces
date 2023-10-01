import { User } from "./User";

export interface FollowedUsers {
  sourceUserId: number;
  targetUserId: number;
  sourceUser?: User;
  targetUser?: User;
}