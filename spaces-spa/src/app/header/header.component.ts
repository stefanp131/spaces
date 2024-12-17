import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { logout } from '../account/account-state/account.actions';
import {  
  selectUser,
} from '../account/account-state/account.selectors';
import { AppState } from '../app-state';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  profileImage$: Observable<string>;
  account$: Observable<User>;
  imageSrc: string;

  constructor(
    public store: Store<AppState>,
  ) {}

  account: Observable<User>;
  ngOnInit(): void {
    this.account$ = this.store.select(selectUser);
  }


  logOut() {
    this.store.dispatch(logout());
  }
}
