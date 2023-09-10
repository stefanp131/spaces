import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { AppState } from '../_ngrx/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { logout } from '../_ngrx/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public store: Store<AppState>, private router: Router) {}

  account: Observable<User> = null;
  ngOnInit(): void {
    this.account = this.store.select(appstate => appstate.spaces.user);
  }

  logOut() {
    this.store.dispatch(logout());
  }
}
