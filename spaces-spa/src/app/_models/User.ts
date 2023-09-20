export interface User {
  username: string;
  roles: string[];
  id: number;
  token: string;
  profileImage?: string;
  aboutMe?: string;
}