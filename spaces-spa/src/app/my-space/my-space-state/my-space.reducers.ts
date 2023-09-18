import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/_models/Post';
import { SpacesStateStatus } from 'src/app/_models/SpacesStateStatus';
import {
  createPost,
  createPostError,
  createPostSuccess,
  deletePost,
  deletePostError,
  deletePostSuccess,
  getPosts,
  getPostsError,
  getPostsSuccess,
} from './my-space.actions';

export interface MySpaceState {
  posts: Post[];
  error: string;
  status: SpacesStateStatus;
}

export const initialState: MySpaceState = {
  posts: [],
  error: null,
  status: SpacesStateStatus.Pending,
};

export const mySpaceReducer = createReducer(
  initialState,
  on(getPosts, (state) => ({ ...state, status: SpacesStateStatus.Loading })),
  on(getPostsSuccess, (state, { posts }) => ({
    ...state,
    posts: posts,
    status: SpacesStateStatus.Success,
  })),
  on(getPostsError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),
  on(createPost, (state) => ({ ...state, status: SpacesStateStatus.Loading })),
  on(createPostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
    status: SpacesStateStatus.Success,
  })),
  on(createPostError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),
  on(deletePost, (state) => ({ ...state, status: SpacesStateStatus.Loading })),
  on(deletePostSuccess, (state, { postId }) => ({
    ...state,
    posts: state.posts.filter((post) => postId !== post.id),
    status: SpacesStateStatus.Success,
  })),
  on(deletePostError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  }))
);
