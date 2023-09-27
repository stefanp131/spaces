import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
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
  toggleLikePost,
  toggleLikePostError,
  toggleLikePostSuccess,
  updatePost,
  updatePostError,
  updatePostSuccess,
} from './our-space.actions';
import { CommentsService } from 'src/app/_services/comment.service';
import { Comment } from 'src/app/_models/Comment';
import { UserService } from 'src/app/_services/user.service';
import { LikesService } from 'src/app/_services/likes.service';
import { AccountAppState, selectLikedByUser, selectUser } from 'src/app/account/account-state/account.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class OurSpaceEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private likesService: LikesService,
    private commentService: CommentsService,
    private accountStore: Store<AccountAppState>  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPosts),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => {
            const posts = users.flatMap((user) => user.posts);
            return getPostsSuccess({ posts: posts });
          }),
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
      withLatestFrom(this.accountStore.select(selectUser)),
      map(([action, user]) => ({
        ...action,
        createPost: { ...action.createPost, userId: +user.id },
      })),
      switchMap((action) =>
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


  toggleLikePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleLikePost),
      concatLatestFrom((action) => [this.accountStore.select(selectUser), this.accountStore.select(selectLikedByUser(action.likedByUsers))]),
      map(([action, user, like]) => {
        if (like) {
          this.likesService.dislike(+user.id, action.postId);
        } else {
          this.likesService.like(+user.id, action.postId);
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

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
      withLatestFrom(this.accountStore.select(selectUser)),
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
      switchMap((action) =>
        from(this.commentService.createComment(action.createComment)).pipe(
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
