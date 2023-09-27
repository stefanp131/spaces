import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
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
  OpenHubsError as openHubsError,
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
  openHubs,
  openHubsSuccess,
  updatePost,
  updatePostError,
  updatePostSuccess,
  closeHubs,
  closeHubsSuccess,
  closeHubsError,
  toggleLikePost,
  toggleLikePostSuccess,
  toggleLikePostError,
} from './my-space.actions';
import { CommentsService } from 'src/app/_services/comment.service';
import { Comment } from 'src/app/_models/Comment';
import { Store } from '@ngrx/store';
import {
  AccountAppState,
  selectLikedByUser,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { LikesService } from 'src/app/_services/likes.service';

@Injectable()
export class MySpaceEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private likesService: LikesService,

    private commentService: CommentsService,
    private accountStore: Store<AccountAppState>
  ) {}

  openHubs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openHubs),
      withLatestFrom(this.accountStore.select(selectUser)),
      map(([action, user]) => {
        this.likesService.createHubConnection(user);
        this.commentService.createHubConnection(user);

        return openHubsSuccess();
      }),
      catchError((error) => {
        return of(openHubsError({ error }));
      })
    )
  );

  closeHubs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeHubs),
      map(() => {
        this.likesService.stopHubConnection();
        this.commentService.stopHubConnection();

        return closeHubsSuccess();
      }),
      catchError((error) => {
        return of(closeHubsError({ error }));
      })
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
      withLatestFrom(this.accountStore.select(selectUser)),
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
      withLatestFrom(this.accountStore.select(selectUser)),
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
