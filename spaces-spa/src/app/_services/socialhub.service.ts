import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/User';
import { CreateComment } from '../_models/CreateComment';

@Injectable({
  providedIn: 'root',
})
export class SocialHubService {
  private hubConnection?: HubConnection;

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hubsUrl + 'social', { accessTokenFactory: () => user.token })
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
    return this.hubConnection
      .invoke('CreateComment', createComment)
      .catch((error) => console.log(error));
  }

  async deleteComment(commentId: number) {
    return this.hubConnection
      .invoke('DeleteComment', commentId)
      .catch((error) => console.log(error));
  }

  async likePost(sourceUserId: number, targetPostId: number) {
    return this.hubConnection.invoke('CreatePostLike', +sourceUserId, targetPostId)
      .catch(error => console.log(error));
  }

  async dislikePost(sourceUserId: number, targetPostId: number) {
    return this.hubConnection.invoke('DeletePostLike', +sourceUserId, targetPostId)
      .catch(error => console.log(error));
  }

  async likeComment(sourceUserId: number, targetCommentId: number) {
    return this.hubConnection.invoke('CreateCommentLike', +sourceUserId, targetCommentId)
      .catch(error => console.log(error));
  }

  async dislikeComment(sourceUserId: number, targetCommentId: number) {
    return this.hubConnection.invoke('DeleteCommentLike', +sourceUserId, targetCommentId)
      .catch(error => console.log(error));
  }
}