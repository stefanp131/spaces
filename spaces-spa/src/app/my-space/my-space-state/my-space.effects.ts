import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
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
} from './my-space.actions';
import { CommentsService } from 'src/app/_services/comment.service';
import { Comment } from 'src/app/_models/Comment';

@Injectable()
export class MySpaceEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private commentService: CommentsService
  ) {}

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

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePost),
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
            deleteCommentSuccess({commentId: action.commentId, postId: action.postId})
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
