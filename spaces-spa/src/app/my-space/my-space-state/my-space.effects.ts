import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import {
  catchError,
  from,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { PostsService } from 'src/app/_services/post.service';
import {
  createComment,
  createCommentError,
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
  toggleLikePost,
  toggleLikePostSuccess,
  toggleLikePostError,
  toggleLikeComment,
  toggleLikeCommentError,
  toggleLikeCommentSuccess,
} from './my-space.actions';
import { CommentsService } from 'src/app/_services/comment.service';
import { Comment } from 'src/app/_models/Comment';
import { Store } from '@ngrx/store';
import {
  selectCommentsLikedByUser,
  selectPostsLikedByUser,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { AppState } from 'src/app/app-state';
import { SocialHubService } from 'src/app/_services/socialhub.service';

@Injectable()
export class MySpaceEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private commentService: CommentsService,
    private store: Store<AppState>,
    private socialHubService: SocialHubService
  ) {} 

  toggleLikePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleLikePost),
      concatLatestFrom((action) => [this.store.select(selectUser), this.store.select(selectPostsLikedByUser(action.likedByUsers))]),
      map(([action, user, like]) => {
        if (like) {
          this.socialHubService.dislikePost(+user.id, action.postId);
        } else {
          this.socialHubService.likePost(+user.id, action.postId);
        }
        return toggleLikePostSuccess({
          like: like,
          userId: +user.id,
          postId: action.postId,
        });
      }),
      catchError((error) => {
        return of(toggleLikePostError({ error }));
      })
    )
  );

  toggleLikeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleLikeComment),
      concatLatestFrom((action) => [this.store.select(selectUser), this.store.select(selectCommentsLikedByUser(action.likedByUsers))]),
      map(([action, user, like]) => {
        if (like) {
          this.socialHubService.dislikeComment(+user.id, action.commentId);
        } else {
          this.socialHubService.likeComment(+user.id, action.commentId);
        }
        return toggleLikeCommentSuccess({
          like: like,
          userId: +user.id,
          commentId: action.commentId,
          postId: action.postId
        });
      }),
      catchError((error) => {
        return of(toggleLikeCommentError({ error }));
      })
    )
  );

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPosts),
      switchMap(() =>
        this.postsService.getPosts().pipe(
          map((posts) => getPostsSuccess({ posts: posts })),
          catchError((error) => {
            this.snackBar.open('Something went wrong!', 'Dismiss', {
              duration: 5000,
            });
            return of(getPostsError({ error }));
          })
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      withLatestFrom(this.store.select(selectUser)),
      map(([action, user]) => ({
        ...action,
        createPost: { ...action.createPost, userId: +user.id },
      })),
      switchMap(action =>
        this.postsService.createPost(action.createPost).pipe(
          map((post) => createPostSuccess({ post })),
          catchError((error) => {
            this.snackBar.open('Something went wrong!', 'Dismiss', {
              duration: 5000,
            });
            return of(createPostError({ error }));
          })
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      withLatestFrom(this.store.select(selectUser)),
      map(([action, user]) => ({
        ...action,
        updatePost: { ...action.updatePost, userId: +user.id },
      })),
      switchMap((action) =>
        this.postsService.updatePost(action.id, action.updatePost).pipe(
          tap(() => {
            this.router.navigate(['/my-space']);
            this.snackBar.open(
              `Successfully updated post with title: \"${action.updatePost.title}\"!`,
              'Dismiss',
              {
                duration: 5000,
              }
            );
          }),
          map((post) => updatePostSuccess({ post })),
          catchError((error) => {
            this.snackBar.open('Something went wrong!', 'Dismiss', {
              duration: 5000,
            });
            return of(updatePostError({ error }));
          })
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) =>
        this.postsService.deletePost(action.postId).pipe(
          map(() => deletePostSuccess({ postId: action.postId })),
          catchError((error) => {
            this.snackBar.open('Something went wrong!', 'Dismiss', {
              duration: 5000,
            });
            return of(deletePostError({ error }));
          })
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createComment),
      withLatestFrom(this.store.select(selectUser)),
      map(([action, user]) => ({
        ...action,
        createComment: { ...action.createComment, userId: +user.id },
      })),
      switchMap((action) =>
        from(this.commentService.createComment(action.createComment)).pipe(
          tap((comment) => console.log(comment)),
          map((comment: Comment) =>
            createCommentSuccess({
              comment: comment,
            })
          ),
          catchError((error) => {
            this.snackBar.open('Something went wrong!', 'Dismiss', {
              duration: 5000,
            });
            return of(createCommentError({ error }));
          })
        )
      )
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteComment),
      switchMap((action) =>
        from(this.commentService.deleteComment(action.commentId)).pipe(
          map(() =>
            deleteCommentSuccess({
              commentId: action.commentId,
              postId: action.postId,
            })
          ),
          catchError((error) => {
            this.snackBar.open('Something went wrong!', 'Dismiss', {
              duration: 5000,
            });
            return of(deleteCommentError({ error }));
          })
        )
      )
    )
  );
}
