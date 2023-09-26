import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, delay, map, merge, switchMap } from 'rxjs';
import { User } from '../_models/User';
import { logout } from '../account/account-state/account.actions';
import {
  AccountAppState,
  selectUser,
} from '../account/account-state/account.selectors';
import { HeaderService as ProfileImageService } from '../_services/profile-image.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profileImage$: Observable<string>;
  account$: Observable<User>;
  imageSrc: string;

  constructor(
    public store: Store<AccountAppState>,
    private accountService: ProfileImageService,
    private userService: UserService
  ) {}

  account: Observable<User>;
  ngOnInit(): void {
    this.account$ = this.store.select(selectUser);
  }


  logOut() {
    this.store.dispatch(logout());
  }
}
