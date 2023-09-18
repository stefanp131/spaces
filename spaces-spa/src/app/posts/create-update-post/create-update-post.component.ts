import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import {
  AccountAppState,
  AccountState,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { createPost } from 'src/app/my-space/my-space-state/my-space.actions';
import { MySpaceAppState } from 'src/app/my-space/my-space-state/my-space.selectors';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss'],
})
export class CreateUpdatePostComponent implements OnInit {
  createUpdatePostForm: FormGroup;

  /**
   *
   */
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MySpaceAppState>,
    private storeAccount: Store<AccountAppState>
  ) {}
  ngOnInit(): void {
    this.createUpdatePostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  createUpdate() {
    this.storeAccount
      .select((appstate) => appstate.account.user)
      .pipe(
        map((user) => {
          this.store.dispatch(
            createPost({
              createPost: {
                ...this.createUpdatePostForm.value,
                userId: user.id,
              },
            })
          );
        })
      ).subscribe();
  }
}
