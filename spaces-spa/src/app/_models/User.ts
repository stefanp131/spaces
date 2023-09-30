import { FollowedUsers } from "./FollowedUsers";
import { Post } from "./Post";

export interface User {
  username: string;
  roles: string[];
  id: number;
  token: string;
  profileImage?: string;
  aboutMe?: string;
  posts?: Post[];
  followedByUsers?: FollowedUsers[];
  followedUsers?: FollowedUsers[];
  followed?: boolean;
}