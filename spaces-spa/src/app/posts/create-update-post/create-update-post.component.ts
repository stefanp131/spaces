import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import { AccountAppState } from 'src/app/account/account-state/account.selectors';
import {
  createPost,
  updatePost,
} from 'src/app/my-space/my-space-state/my-space.actions';
import {
  MySpaceAppState,
  selectPost,
} from 'src/app/my-space/my-space-state/my-space.selectors';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss'],
})
export class CreateUpdatePostComponent implements OnInit {
  account$ = this.storeAccount.select((appstate) => appstate.account.user);
  post$: Observable<Post>;
  postTitle: string;

  @Input() postId: number;

  createUpdatePostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MySpaceAppState>,
    private storeAccount: Store<AccountAppState>
  ) {}
  ngOnInit(): void {
    this.store
      .select(selectPost(+this.postId))
      .pipe(
        map((post) => {
          this.initForm(post);
        })
      )
      .subscribe();
  }

  private initForm(post?: Post) {
    this.createUpdatePostForm = this.formBuilder.group({
      title: [post ? post.title : '', Validators.required],
      content: [post ? post.content : '', Validators.required],
    });

    if (post) {
      this.postTitle = post.title;
      this.createUpdatePostForm.get('title').disable();
      this.createUpdatePostForm.markAsPristine();
    }
  }

  createPost() {
    this.account$
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
      )
      .subscribe();
  }

  updatePost() {
    this.account$
      .pipe(
        map((user) => {
          this.store.dispatch(
            updatePost({
              id: +this.postId,
              updatePost: {
                content: this.createUpdatePostForm.get('content').value,
                title: this.postTitle,
                userId: user.id,
                id: +this.postId,
              },
            })
          );
        })
      )
      .subscribe();
  }
}
