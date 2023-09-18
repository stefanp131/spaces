import { createAction, props } from '@ngrx/store';
import { CreateUpdatePost } from 'src/app/_models/CreateUpdatePost';
import { Post } from 'src/app/_models/Post';

export const getPosts = createAction('[My-Space] Get Posts');
export const getPostsSuccess = createAction(
  '[My-Space] Get Posts Success',
  props<{ posts: Post[] }>()
);

export const getPostsError = createAction(
  '[My-Space] Get Posts Error',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[My-Space] Create Post',
  props<{ createPost: CreateUpdatePost }>()
);

export const createPostSuccess = createAction(
  '[My-Space] Create Post Success',
  props<{ post: Post }>()
);

export const createPostError = createAction(
  '[My-Space] Create Post Error',
  props<{ error: string }>()
);

export const deletePost = createAction(
  '[My-Space] Delete Post',
  props<{ postId: number }>()
);

export const deletePostSuccess = createAction(
  '[My-Space] Delete Post Success',
  props<{ postId: number }>()
);

export const deletePostError = createAction(
  '[My-Space] Delete Post Error',
  props<{ error: string }>()
);
