import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/_models/Comment';

@Component({
    selector: 'app-comments-list',
    templateUrl: './comments-list.component.html',
    styleUrls: ['./comments-list.component.scss'],
    standalone: false
})
export class CommentsListComponent {
@Input() comments: Comment[];
}
