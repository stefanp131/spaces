export interface Comment {
  id: number;
  title: string;
  content: string;
  dateCreated: Date;
  postId: number;
  userId: number;
}
