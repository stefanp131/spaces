import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createComment } from 'src/app/my-space/my-space-state/my-space.actions';
import { createComment as createCommentOurSpace } from 'src/app/our-space/our-space-state/our-space.actions';

import { AppState } from 'src/app/app-state';

@Component({
    selector: 'app-create-comment',
    templateUrl: './create-comment.component.html',
    styleUrls: ['./create-comment.component.scss'],
    standalone: false
})
export class CreateCommentComponent implements OnInit {
  @Input() postId: number;
  commentFormGroup: FormGroup;
  mySpace: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private location: Location
  ) {
    this.mySpace = !this.location.path().includes('our-space');
  }

  ngOnInit(): void {
    this.commentFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  createComment() {
    if (this.mySpace) {
      this.store.dispatch(
        createComment({
          createComment: {
            ...this.commentFormGroup.value,
            postId: +this.postId,
          },
        })
      );
    } else {
      this.store.dispatch(
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
