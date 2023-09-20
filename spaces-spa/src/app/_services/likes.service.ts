import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  hubsUrl = environment.hubsUrl;
  private hubConnection?: HubConnection;

  constructor() {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubsUrl + 'likes', { accessTokenFactory: () => user.token })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }

  async like(sourceUserId: number, targetPostId: number) {
    return this.hubConnection.invoke('CreateLike', +sourceUserId, targetPostId)
      .catch(error => console.log(error));
  }

  async dislike(sourceUserId: number, targetPostId: number) {
    return this.hubConnection.invoke('DeleteLike', +sourceUserId, targetPostId)
      .catch(error => console.log(error));
  }
}
