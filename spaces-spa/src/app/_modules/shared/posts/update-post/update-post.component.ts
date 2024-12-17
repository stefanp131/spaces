import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-update-post',
    templateUrl: './update-post.component.html',
    styleUrls: ['./update-post.component.scss'],
    standalone: false
})
export class UpdatePostComponent {
  postId: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.postId = activatedRoute.snapshot.params['id'];
  }
}
