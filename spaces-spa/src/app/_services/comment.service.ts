import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateComment } from '../_models/CreateComment';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { Comment } from '../_models/Comment';
import { createCommentSuccess } from '../my-space/my-space-state/my-space.actions';
import { createCommentSuccess as createCommentSuccessOurSpace } from '../our-space/our-space-state/our-space.actions';
import { Location } from '@angular/common';
import { SocialHubService } from './socialhub.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  mySpace: boolean;

  constructor(private store: Store<AppState>, private location: Location, private socialHubService: SocialHubService) {}

  async createComment(createComment: CreateComment) {
    return this.socialHubService.createComment(createComment);
  }

  async deleteComment(commentId: number) {
    return this.socialHubService.deleteComment(commentId);
  }

  async like(sourceUserId: number, targetCommentId: number) {
    return this.socialHubService.likeComment(sourceUserId, targetCommentId);
  }

  async dislike(sourceUserId: number, targetCommentId: number) {
    return this.socialHubService.dislikeComment(sourceUserId, targetCommentId);
  }
}
