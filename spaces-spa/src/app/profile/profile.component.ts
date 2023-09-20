import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AccountAppState,
  selectUser,
} from '../account/account-state/account.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, switchMap } from 'rxjs';
import { Profile } from '../_models/Profile';
import { User } from '../_models/User';
import { HeaderService } from '../_services/profile-image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedFile: any = null;
  isReadonlyMode = false;
  imageSrc: string;
  aboutMe: string;
  account$: Observable<User>;

  constructor(
    private accountStore: Store<AccountAppState>,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.account$ = this.accountStore.select(selectUser);

    this.getProfileAndInitForm();
  }

  private getProfileAndInitForm() {
    this.account$
      .pipe(switchMap((user) => this.userService.getProfileById(user.id)))
      .subscribe((value) => {
        this.imageSrc =
          value?.profileImage ?? '../../../assets/empty-profile-pic.png';

        this.aboutMe = value?.aboutMe;

        this.profileForm = this.formBuilder.group({
          aboutMe: [value.aboutMe, Validators.required],
        });
      });
  }

  public updateProfile() {
    const profile: Profile = {
      ...this.profileForm.value,
      profileImage: this.imageSrc,
    };

    this.aboutMe = this.profileForm.get('aboutMe').value;

    this.account$
      .pipe(
        switchMap((user) => this.userService.updateProfile(user.id, profile))
      )
      .subscribe({
        next: () => {
          this.headerService.set(this.imageSrc);
          this.snackBar.open('Successfully updated the profile!', 'Dismiss', {
            duration: 5000,
          });
        },
        error: () => {
          this.snackBar.open('Something went wrong', 'Dismiss', {
            duration: 5000,
          });
        },
      });
  }

  toggleReadonly() {
    this.isReadonlyMode = !this.isReadonlyMode;
  }

  async onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
    const base64 = await this.convertBase64(this.selectedFile);
    this.imageSrc = base64 as string;
  }

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
}
