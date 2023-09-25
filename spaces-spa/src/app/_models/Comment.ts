export interface Comment {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  dateCreated: Date;
  postId: number;
  userId: number;
}
