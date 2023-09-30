import { Component, OnInit } from '@angular/core';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';
import { User } from '../_models/User';
import { Observable, map, take, takeUntil, tap, withLatestFrom } from 'rxjs';
import { selectUserWithFollowers, selectUsers } from './our-space-state/our-space.selectors';
import { selectUser } from '../account/account-state/account.selectors';
import { toggleFollowUser } from './our-space-state/our-space.actions';

@Component({
  selector: 'app-our-space',
  templateUrl: './our-space.component.html',
  styleUrls: ['./our-space.component.scss'],
})
export class OurSpaceComponent implements OnInit {
  user$: Observable<User>;
  users$: Observable<User[]>;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.users$ = this.store.select(selectUserWithFollowers);
  }

  toggleFollow(event: any, targetId: number) {
    this.store.dispatch(
      toggleFollowUser({ follow: event['source']['checked'], targetId })
    );
  }
}
