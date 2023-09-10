import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): boolean {
    if (!this.accountService.currentUserSource.value) {
      this.snackBar.open('You shall not pass!', 'Dismiss', { duration: 5000 });
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}