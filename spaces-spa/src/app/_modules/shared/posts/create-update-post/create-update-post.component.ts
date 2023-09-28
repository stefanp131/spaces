import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Editor, Toolbar, schema, toDoc } from 'ngx-editor';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import { PostsService } from 'src/app/_services/post.service';
import {
  createPost,
  updatePost,
} from 'src/app/my-space/my-space-state/my-space.actions';
import { createPost as createPostOurSpace } from 'src/app/our-space/our-space-state/our-space.actions';

import { Validators as NgxEditorValidators } from 'ngx-editor';
import { Location } from '@angular/common';
import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss'],
})
export class CreateUpdatePostComponent implements OnInit, OnDestroy {
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
  mySpace: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private postsService: PostsService,
    private location: Location
  ) {
    this.mySpace = !this.location.path().includes('our-space');
  }

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
    if (this.mySpace) {
      this.store.dispatch(
        createPost({
          createPost: {
            title: this.createUpdatePostForm.get('title').value,
            content: JSON.stringify(toDoc(content)),
          },
        })
      );
    } else {
      this.store.dispatch(
        createPostOurSpace({
          createPost: {
            title: this.createUpdatePostForm.get('title').value,
            content: JSON.stringify(toDoc(content)),
          },
        })
      );
    }
  }

  updatePost() {
    const content = this.createUpdatePostForm.get('content').value;
    this.store.dispatch(
      updatePost({
        id: +this.postId,
        updatePost: {
          content: JSON.stringify(content),
          title: this.postTitle,
          id: +this.postId,
        },
      })
    );
  }
}
