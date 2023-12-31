import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/_models/Comment';
import { CreateComment } from 'src/app/_models/CreateComment';
import { CreateUpdatePost } from 'src/app/_models/CreateUpdatePost';
import { LikesForComment } from 'src/app/_models/LikesForComment';
import { LikesForPost } from 'src/app/_models/LikesForPost';
import { Post } from 'src/app/_models/Post';
import { User } from 'src/app/_models/User';

export const getPostsAndUsers = createAction('[Our-Space] Get Posts And Users');
export const getPostsAndUsersSuccess = createAction(
  '[Our-Space] Get Posts And Users Success',
  props<{ users: User[]; posts: Post[] }>()
);

export const getPostsAndUsersError = createAction(
  '[Our-Space] Get Posts And Users Error',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Our-Space] Create Post',
  props<{ createPost: CreateUpdatePost }>()
);

export const createPostSuccess = createAction(
  '[Our-Space] Create Post Success',
  props<{ post: Post }>()
);

export const createPostError = createAction(
  '[Our-Space] Create Post Error',
  props<{ error: string }>()
);

export const toggleLikePost = createAction(
  '[Our-Space] Toggle Like Post',
  props<{ postId: number; likedByUsers: LikesForPost[] }>()
);

export const toggleLikePostSuccess = createAction(
  '[Our-Space] Toggle Like Post Success',
  props<{ like: boolean; postId: number; userId: number }>()
);

export const toggleLikePostError = createAction(
  '[Our-Space] Toggle Like Post Error',
  props<{ error: string }>()
);

export const updatePost = createAction(
  '[Our-Space Update] Update Post',
  props<{ id: number; updatePost: CreateUpdatePost }>()
);

export const updatePostSuccess = createAction(
  '[Our-Space Update] Update Post Success',
  props<{ post: Post }>()
);

export const updatePostError = createAction(
  '[Our-Space Update] Update Post Error',
  props<{ error: string }>()
);

export const deletePost = createAction(
  '[Our-Space] Delete Post',
  props<{ postId: number }>()
);

export const deletePostSuccess = createAction(
  '[Our-Space] Delete Post Success',
  props<{ postId: number }>()
);

export const deletePostError = createAction(
  '[Our-Space] Delete Post Error',
  props<{ error: string }>()
);

export const createComment = createAction(
  '[Our-Space] Create Comment',
  props<{ createComment: CreateComment }>()
);

export const createCommentSuccess = createAction(
  '[Our-Space] Create Comment Success',
  props<{ comment: Comment }>()
);

export const createCommentError = createAction(
  '[Our-Space] Create Comment Error',
  props<{ error: string }>()
);

export const toggleLikeComment = createAction(
  '[Our-Space] Toggle Like Comment',
  props<{
    commentId: number;
    likedByUsers: LikesForComment[];
    postId: number;
  }>()
);

export const toggleLikeCommentSuccess = createAction(
  '[Our-Space] Toggle Like Comment Success',
  props<{ like: boolean; commentId: number; userId: number; postId: number }>()
);

export const toggleLikeCommentError = createAction(
  '[Our-Space] Toggle Like Comment Error',
  props<{ error: string }>()
);

export const deleteComment = createAction(
  '[Our-Space] Delete Comment',
  props<{ commentId: number; postId: number }>()
);

export const deleteCommentSuccess = createAction(
  '[Our-Space] Delete Comment Success',
  props<{ commentId: number; postId: number }>()
);

export const deleteCommentError = createAction(
  '[Our-Space] Delete Comment Error',
  props<{ error: string }>()
);
