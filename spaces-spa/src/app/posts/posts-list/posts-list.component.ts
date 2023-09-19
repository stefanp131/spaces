import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_models/Post';
import { getPosts } from 'src/app/my-space/my-space-state/my-space.actions';
import { MySpaceAppState, selectPosts } from 'src/app/my-space/my-space-state/my-space.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  postList: Observable<Post[]>;
  constructor(private store: Store<MySpaceAppState>) {}
  ngOnInit(): void {
    this.store.dispatch(getPosts());
    this.postList = this.store.select(selectPosts);
  }
}
