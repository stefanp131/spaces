import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectUser,
  selectSearchUsersForUser,
  selectFollowedUsers,
  selectFollowersForUser,
} from '../account/account-state/account.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { Profile } from '../_models/Profile';
import { User } from '../_models/User';
import { AppState } from '../app-state';
import {
  getFollowedUsers,
  getUserProfile,
  getUsersBySearchTerm,
  toggleFollowUser,
  updateUserProfile,
} from '../account/account-state/account.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  searchForm: FormGroup;
  aboutMe: string;
  destroy$ = new Subject<void>();
  account$: Observable<User>;
  users$: Observable<User[]>;
  followedUsers$: Observable<User[]>;

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch(getUserProfile());
    this.store.dispatch(getFollowedUsers());

    this.account$ = this.store.select(selectUser);
    this.followedUsers$ = this.store.select(selectFollowersForUser);
    this.users$ = this.store.select(selectSearchUsersForUser);

    this.searchForm = this.formBuilder.group({
      search: [''],
    });

    this.store
      .select(selectUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (user) =>
          (this.profileForm = this.formBuilder.group({
            aboutMe: [user?.aboutMe],
          }))
      );
  }

  toggleFollow(event: any, targetId: number) {
    this.store.dispatch(
      toggleFollowUser({ follow: event['checked'], targetId })
    );
  }

  public search() {
    this.store.dispatch(getUsersBySearchTerm({searchTerm: this.searchForm.get('search').value}))
  }

  public updateProfile() {
    const profile: Profile = {
      ...this.profileForm.value,
    };

    this.store.dispatch(updateUserProfile({ profile: this.profileForm.value }));
  }
}
