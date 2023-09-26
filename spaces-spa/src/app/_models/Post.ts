import { Comment } from "./Comment";
import { LikesForPost } from "./LikesForPost";

export interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
  dateCreated: Date;
  dateUpdated: Date;
  likedByUsers: LikesForPost[];
  createdBy: string;
}