import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Editor, Toolbar, schema, toDoc } from 'ngx-editor';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import { PostsService } from 'src/app/_services/post.service';
import { AccountAppState } from 'src/app/account/account-state/account.selectors';
import {
  createPost,
  updatePost,
} from 'src/app/my-space/my-space-state/my-space.actions';
import {
  MySpaceAppState,
  selectPost,
} from 'src/app/my-space/my-space-state/my-space.selectors';

import { Validators as NgxEditorValidators } from 'ngx-editor';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss'],
})
export class CreateUpdatePostComponent implements OnInit, OnDestroy {
  account$ = this.storeAccount.select((appstate) => appstate.account.user);
  post$: Observable<Post>;
  postTitle: string;

  @Input() postId: number;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  createUpdatePostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MySpaceAppState>,
    private storeAccount: Store<AccountAppState>,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor({ schema: schema });

    if (this.postId) {
      this.postsService
        .getPostById(+this.postId)
        .pipe(
          map((post) => {
            this.initUpdateForm(post);
          })
        )
        .subscribe();
    } else {
      this.createUpdatePostForm = this.formBuilder.group({
        title: ['', Validators.required],
        content: [
          '',
          [
            NgxEditorValidators.required(schema),
            NgxEditorValidators.maxLength(4000, schema),
          ],
        ],
      });
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  private initUpdateForm(post?: Post) {
    if (post) {
      this.createUpdatePostForm = this.formBuilder.group({
        title: [post.title, Validators.required],
        content: [
          JSON.parse(post.content),
          [
            NgxEditorValidators.required(schema),
            NgxEditorValidators.maxLength(4000, schema),
          ],
        ],
      });

      this.postTitle = post.title;
      this.createUpdatePostForm.get('title').disable();
      this.createUpdatePostForm.markAsPristine();
    }
  }

  createPost() {
    const content = this.createUpdatePostForm.get('content').value;
    this.account$
      .pipe(
        map((user) => {
          this.store.dispatch(
            createPost({
              createPost: {
                title: this.createUpdatePostForm.get('title').value,
                content: JSON.stringify(toDoc(content)),
                userId: user.id,
              },
            })
          );
        })
      )
      .subscribe();
  }

  updatePost() {
    const content = this.createUpdatePostForm.get('content').value;
    this.account$
      .pipe(
        map((user) => {
          this.store.dispatch(
            updatePost({
              id: +this.postId,
              updatePost: {
                content: JSON.stringify(content),
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
