import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
  register,
  registerError,
  registerSuccess,
} from './account.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.accountService
          .login(action.model)
          .pipe(
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
        this.accountService
          .register(action.model)
          .pipe(
            tap(() => {
              this.router.navigate(['/my-space']);
              this.snackBar.open('Successfully registered and logged in!', 'Dismiss', {
                duration: 5000,
              });
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
}
