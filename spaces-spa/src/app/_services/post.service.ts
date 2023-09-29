import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from '../_models/Post';
import { HttpClient } from '@angular/common/http';
import { CreateUpdatePost } from '../_models/CreateUpdatePost';
import { Observable } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl = environment.apiUrl;

  hubsUrl = environment.hubsUrl;
  private hubConnection?: HubConnection;

  /**
   *
   */
  constructor(private http: HttpClient) {}

  createPost(post: CreateUpdatePost): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}post`, post);
  }

  updatePost(id: number, post: CreateUpdatePost): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}post/${id}`, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}post`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}post/${id}`);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}post/${id}`);
  }
  
  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubsUrl + 'posts', { accessTokenFactory: () => user.token })
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
    return this.hubConnection.invoke('CreatePostLike', +sourceUserId, targetPostId)
      .catch(error => console.log(error));
  }

  async dislike(sourceUserId: number, targetPostId: number) {
    return this.hubConnection.invoke('DeletePostLike', +sourceUserId, targetPostId)
      .catch(error => console.log(error));
  }
}
