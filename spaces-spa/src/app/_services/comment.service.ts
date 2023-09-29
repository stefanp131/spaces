import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateComment } from '../_models/CreateComment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  hubsUrl = environment.hubsUrl;
  private hubConnection?: HubConnection;
  connection$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubsUrl + 'comments', { accessTokenFactory: () => user.token })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }

  async createComment(createComment: CreateComment) {
    return this.hubConnection.invoke('CreateComment', createComment)
      .catch(error => console.log(error));
  }

  async deleteComment(commentId: number) {
    return this.hubConnection.invoke('DeleteComment', commentId)
      .catch(error => console.log(error));
  }
  
  async like(sourceUserId: number, targetCommentId: number) {
    return this.hubConnection.invoke('CreateCommentLike', +sourceUserId, targetCommentId)
      .catch(error => console.log(error));
  }

  async dislike(sourceUserId: number, targetCommentId: number) {
    return this.hubConnection.invoke('DeleteCommentLike', +sourceUserId, targetCommentId)
      .catch(error => console.log(error));
  }
}
