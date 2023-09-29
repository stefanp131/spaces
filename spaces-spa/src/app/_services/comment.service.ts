import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
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

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  hubsUrl = environment.hubsUrl;
  private hubConnection?: HubConnection;
  connection$ = new BehaviorSubject<boolean>(false);
  mySpace: boolean;

  constructor(private store: Store<AppState>, private location: Location) {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubsUrl + 'comments', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('CommentCreated', (comment: Comment) => {
      this.mySpace = !this.location.path().includes('our-space');

      this.mySpace
        ? this.store.dispatch(createCommentSuccess({ comment }))
        : this.store.dispatch(createCommentSuccessOurSpace({ comment }));
    });

    this.hubConnection.start().catch((error) => console.log(error));
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().catch((error) => console.log(error));
    }
  }

  async createComment(createComment: CreateComment) {
    return this.hubConnection
      .invoke('CreateComment', createComment)
      .catch((error) => console.log(error));
  }

  async deleteComment(commentId: number) {
    return this.hubConnection
      .invoke('DeleteComment', commentId)
      .catch((error) => console.log(error));
  }

  async like(sourceUserId: number, targetCommentId: number) {
    return this.hubConnection
      .invoke('CreateCommentLike', +sourceUserId, targetCommentId)
      .catch((error) => console.log(error));
  }

  async dislike(sourceUserId: number, targetCommentId: number) {
    return this.hubConnection
      .invoke('DeleteCommentLike', +sourceUserId, targetCommentId)
      .catch((error) => console.log(error));
  }
}
