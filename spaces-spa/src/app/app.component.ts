import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { Store } from '@ngrx/store';
import { Token } from './_models/Token';
import { autoLogin } from './account/account-state/account.actions';
import { AppState } from './app-state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  constructor(
    private accountService: AccountService,
    private store: Store<AppState>
  ) {
    const token: Token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const user = this.accountService.setCurrentUser(token);

      this.store.dispatch(autoLogin({ info: user }));
    }
  }
}
