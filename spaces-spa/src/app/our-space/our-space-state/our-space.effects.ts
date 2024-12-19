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
  getPostsAndUsers,
  getPostsAndUsersError,
  getPostsAndUsersSuccess,
  toggleLikeComment,
  toggleLikeCommentError,
  toggleLikeCommentSuccess,
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
import {
  selectCommentsLikedByUser,
  selectPostsLikedByUser,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { SocialHubService } from 'src/app/_services/socialhub.service';

@Injectable()
export class OurSpaceEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>,
    private socialHubService: SocialHubService
  ) {}

  getPostsAndUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPostsAndUsers),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([action, user]) =>
        this.userService.getFollowedUsers(+user.id).pipe(
          map((followedUsers) => {

            const posts = followedUsers.flatMap((listUser) => listUser.posts);
            return getPostsAndUsersSuccess({ users: followedUsers, posts: posts });
          }),
          catchError((error) => {
            this.snackBar.open('Something went wrong!', 'Dismiss', {
              duration: 5000,
            });
            return of(getPostsAndUsersError({ error }));
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
      concatLatestFrom((action) => [
        this.store.select(selectUser),
        this.store.select(selectPostsLikedByUser(action.likedByUsers)),
      ]),
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
      concatLatestFrom((action) => [
        this.store.select(selectUser),
        this.store.select(selectCommentsLikedByUser(action.likedByUsers)),
      ]),
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
          postId: action.postId,
        });
      }),
      catchError((error) => {
        return of(toggleLikeCommentError({ error }));
      })
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
        from(this.socialHubService.createComment(action.createComment)).pipe(
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
        from(this.socialHubService.deleteComment(action.commentId)).pipe(
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
