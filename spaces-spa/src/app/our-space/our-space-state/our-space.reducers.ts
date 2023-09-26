import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/_models/Post';
import { SpacesStateStatus } from 'src/app/_models/SpacesStateStatus';
import {
  createComment,
  createCommentSuccess,
  createPost,
  createPostError,
  createPostSuccess,
  deleteComment,
  deleteCommentError,
  deleteCommentSuccess,
  deletePost,
  deletePostError,
  deletePostSuccess,
  getPosts,
  getPostsError,
  getPostsSuccess,
  updatePost,
  updatePostError,
  updatePostSuccess,
} from './our-space.actions';

export interface OurSpaceState {
  posts: Post[];
  error: string;
  status: SpacesStateStatus;
}

export const initialState: OurSpaceState = {
  posts: [],
  error: null,
  status: SpacesStateStatus.Pending,
};

export const ourSpaceReducer = createReducer(
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
  on(updatePost, (state) => ({ ...state, status: SpacesStateStatus.Loading })),
  on(updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: [
      ...state.posts.map((listPost) =>
        listPost.id === post.id ? post : listPost
      ),
    ],
    status: SpacesStateStatus.Success,
  })),
  on(updatePostError, (state, { error }) => ({
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
  })),
  on(createComment, (state) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(createCommentSuccess, (state, { comment }) => ({
    ...state,
    posts: [
      ...state.posts.map((listPost) =>
        listPost.id === comment.postId
          ? { ...listPost, comments: [...listPost.comments, comment] }
          : listPost
      ),
    ],
    status: SpacesStateStatus.Success,
  })),
  on(createPostError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  })),
  on(deleteComment, (state, { commentId, postId }) => ({
    ...state,
    status: SpacesStateStatus.Loading,
  })),
  on(deleteCommentSuccess, (state, { commentId, postId }) => ({
    ...state,
    posts: [
      ...state.posts.map((listPost) =>
        listPost.id === postId
          ? {
              ...listPost,
              comments: [
                ...listPost.comments.filter(
                  (comment) => commentId !== comment.id
                ),
              ],
            }
          : listPost
      ),
    ],
    status: SpacesStateStatus.Success,
  })),
  on(deleteCommentError, (state, { error }) => ({
    ...state,
    error: error,
    status: SpacesStateStatus.Error,
  }))
);
