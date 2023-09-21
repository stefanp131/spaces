import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import {
  AccountAppState,
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { createComment } from 'src/app/my-space/my-space-state/my-space.actions';
import { MySpaceAppState } from 'src/app/my-space/my-space-state/my-space.selectors';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent implements OnInit {
  @Input() postId: number;
  commentFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MySpaceAppState>,
    private storeAccount: Store<AccountAppState>
  ) {}

  ngOnInit(): void {
    this.commentFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  createComment() {
    this.storeAccount
      .select(selectUser)
      .pipe(
        map((user) => {
          this.store.dispatch(
            createComment({
              createComment: {
                ...this.commentFormGroup.value,
                postId: +this.postId,
                userId: +user.id,
              },
            })
          );
        })
      )
      .subscribe();
  }
}
