import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { logout } from '../account/account-state/account.actions';
import { AccountAppState } from '../account/account-state/account.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public store: Store<AccountAppState>, private router: Router) {}

  account: Observable<User> = null;
  ngOnInit(): void {
    this.account = this.store.select(appstate => appstate.account.user);
  }

  logOut() {
    this.store.dispatch(logout());
  }
}
