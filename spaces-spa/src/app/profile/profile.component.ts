import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../account/account-state/account.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { Profile } from '../_models/Profile';
import { User } from '../_models/User';
import { AppState } from '../app-state';
import { getUserProfile, updateUserProfile } from '../account/account-state/account.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  aboutMe: string;
  destroy$ = new Subject<void>();
  account$: Observable<User>;

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
    this.account$ = this.store.select(selectUser);

    this.store.dispatch(getUserProfile());

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

  private getProfileAndInitForm() {}

  public updateProfile() {
    const profile: Profile = {
      ...this.profileForm.value,
    };

    this.store.dispatch(updateUserProfile({profile: this.profileForm.value}))
  }
}
