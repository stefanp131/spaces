import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getUserProfile,
  getUserProfileError,
  getUserProfileSuccess,
  getUsersBySearchTerm,
  getUsersBySearchTermError,
  getUsersBySearchTermSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  register,
  registerError,
  registerSuccess,
  toggleFollowUser,
  toggleFollowUserError,
  toggleFollowUserSuccess,
  updateUserProfile,
  updateUserProfileError,
  updateUserProfileSuccess,
} from './account.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { selectUser } from './account.selectors';
import { AppState } from 'src/app/app-state';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/_services/user.service';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.accountService.login(action.model).pipe(
          tap(() => {
            this.router.navigate(['/my-space']);
            this.snackBar.open('Successfully logged in!', 'Dismiss', {
              duration: 5000,
            });
          }),
          map((info) => this.accountService.setCurrentUser(info)),
          map((info) => loginSuccess({ info })),
          catchError((error) => {
            this.snackBar.open('Wrong credentials!', 'Dismiss', {
              duration: 5000,
            });
            return of(loginError({ error }));
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }),
      map((action) => {
        return logoutSuccess();
      }),
      catchError((error) => of(logoutError(error)))
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.accountService.register(action.model).pipe(
          tap(() => {
            this.router.navigate(['/my-space']);
            this.snackBar.open(
              'Successfully registered and logged in!',
              'Dismiss',
              {
                duration: 5000,
              }
            );
          }),
          map((info) => this.accountService.setCurrentUser(info)),
          map((info) => registerSuccess({ info })),
          catchError((error) => {
            this.snackBar.open('Something went wrong!', 'Dismiss', {
              duration: 5000,
            });
            return of(registerError({ error }));
          })
        )
      )
    )
  );

  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfile),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([action, user]) =>
        this.userService.getProfileById(user.id).pipe(
          map((profile) => getUserProfileSuccess({ profile })),
          catchError((error) => {
            return of(getUserProfileError({ error }));
          })
        )
      )
    )
  );

  getUsersBySearchTerm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersBySearchTerm),
      switchMap((action) =>
        this.userService.getUsers(action.searchTerm).pipe(
          map((users) => getUsersBySearchTermSuccess({ users })),
          catchError((error) => {
            return of(getUsersBySearchTermError({ error }));
          })
        )
      )
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserProfile),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([action, user]) =>
        this.userService.updateProfile(user.id, action.profile).pipe(
          map(() => updateUserProfileSuccess({ profile: action.profile })),
          catchError((error) => {
            return of(updateUserProfileError({ error }));
          })
        )
      )
    )
  );

  toggleFollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleFollowUser),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([action, user]) =>
        !action.follow
          ? this.userService
              .unfollow({
                sourceUserId: +user.id,
                targetUserId: +action.targetId,
              })
              .pipe(
                map(() =>
                  toggleFollowUserSuccess({
                    follow: action.follow,
                    sourceId: +user.id,
                    targetId: +action.targetId,
                  })
                )
              )
          : this.userService
              .follow({
                sourceUserId: +user.id,
                targetUserId: +action.targetId,
              })
              .pipe(
                map(() =>
                  toggleFollowUserSuccess({
                    follow: action.follow,
                    sourceId: +user.id,
                    targetId: +action.targetId,
                  })
                )
              )
      ),
      catchError((error) => {
        return of(toggleFollowUserError({ error }));
      })
    )
  );
}
