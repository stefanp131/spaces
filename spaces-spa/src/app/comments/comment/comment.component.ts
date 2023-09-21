import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Comment } from 'src/app/_models/Comment';
import { MySpaceAppState } from 'src/app/my-space/my-space-state/my-space.selectors';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment: Comment;

  constructor(private store: Store<MySpaceAppState>) {
    
  }

  delete(commentId: number) {

  }
}
