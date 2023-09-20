import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toHTML } from 'ngx-editor';
import { Post } from 'src/app/_models/Post';
import { deletePost } from 'src/app/my-space/my-space-state/my-space.actions';
import { MySpaceAppState } from 'src/app/my-space/my-space-state/my-space.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private _post: Post = {
    id: undefined,
    title: undefined,
    comments: [],
    content: undefined,
    dateCreated: undefined,
    dateUpdated: undefined,
  };

  @Input() set post(value: Post) {
    this._post = { ...value };
    this.getHTMLFromValue(this._post);
  }

  get post(): Post {
    return this._post;
  }
  constructor(private store: Store<MySpaceAppState>) {}
  ngOnInit(): void {}

  getHTMLFromValue(post: Post) {
    this._post.content = toHTML(JSON.parse(post.content));
  }

  delete(postId: number) {
    this.store.dispatch(deletePost({ postId }));
  }
}
