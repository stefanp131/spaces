import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/_models/Post';
import { deletePost } from 'src/app/my-space/my-space-state/my-space.actions';
import { MySpaceAppState } from 'src/app/my-space/my-space-state/my-space.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  /**
   *
   */
  constructor(private store: Store<MySpaceAppState>) {}
  ngOnInit(): void {}

  delete(postId: number) {
    this.store.dispatch(deletePost({ postId }));
  }
}
