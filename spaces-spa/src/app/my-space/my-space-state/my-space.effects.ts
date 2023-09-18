import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PostsService } from 'src/app/_services/post.service';
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

@Injectable()
export class MySpaceEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private snackBar: MatSnackBar,
    private router: Router
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
}
