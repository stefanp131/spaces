import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/_models/User';
import {
  AccountAppState,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { createComment } from 'src/app/my-space/my-space-state/my-space.actions';
import { createComment as createCommentOurSpace } from 'src/app/our-space/our-space-state/our-space.actions';

import { MySpaceAppState } from 'src/app/my-space/my-space-state/my-space.selectors';
import { OurSpaceAppState } from 'src/app/our-space/our-space-state/our-space.selectors';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnInit {
  @Input() postId: number;
  commentFormGroup: FormGroup;
  mySpace: boolean;
  user$: Observable<User>;

  constructor(
    private formBuilder: FormBuilder,
    private mySpaceStore: Store<MySpaceAppState>,
    private ourSpaceStore: Store<OurSpaceAppState>,
    private storeAccount: Store<AccountAppState>,
    private location: Location
  ) {
    this.mySpace = !this.location.path().includes('our-space');
  }

  ngOnInit(): void {
    this.commentFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.user$ = this.storeAccount.select(selectUser);
  }

  createComment() {
    if (this.mySpace) {
      this.mySpaceStore.dispatch(
        createComment({
          createComment: {
            ...this.commentFormGroup.value,
            postId: +this.postId,
          },
        })
      );
    } else {
      this.ourSpaceStore.dispatch(
        createCommentOurSpace({
          createComment: {
            ...this.commentFormGroup.value,
            postId: +this.postId,
          },
        })
      );
    }
  }
}
