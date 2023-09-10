import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from './selectors';
import { AccountService } from '../_services/account.service';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  logoutError,
  logoutSuccess,
} from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class SpacesEffects {
  constructor(
    private actions$: Actions,
    private Store: Store<AppState>,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.accountService
          .login({ userName: action.userName, password: action.password })
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
}
