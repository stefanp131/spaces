import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectUser } from '../account/account-state/account.selectors';
import { AppState } from '../app-state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select(selectUser)
      .pipe(
        map((user) => {
          if (!user) {
            this.snackBar.open('You shall not pass!', 'Dismiss', {
              duration: 5000,
            });
            this.router.navigate(['/login']);
          }

          return !!user;
        })
      );
  }
}
