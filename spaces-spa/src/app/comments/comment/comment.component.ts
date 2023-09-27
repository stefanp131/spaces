import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/_models/Comment';
import { User } from 'src/app/_models/User';
import { selectUser } from 'src/app/account/account-state/account.selectors';
import { deleteComment } from 'src/app/my-space/my-space-state/my-space.actions';
import { deleteComment as deleteCommentOurSpace } from 'src/app/our-space/our-space-state/our-space.actions';

import { AppState } from 'src/app/app-state';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  user$: Observable<User>;

  mySpace: boolean;

  constructor(
    private store: Store<AppState>,
    private location: Location
  ) {
    this.mySpace = !this.location.path().includes('our-space');
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);    
  }

  delete(commentId: number) {
    if(this.mySpace) {
      this.store.dispatch(
        deleteComment({ commentId: commentId, postId: this.comment.postId })
      );
    } else {
      this.store.dispatch(
        deleteCommentOurSpace({ commentId: commentId, postId: this.comment.postId })
      );
    }

  }
}
