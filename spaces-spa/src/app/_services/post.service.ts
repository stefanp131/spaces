import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from '../_models/Post';
import { HttpClient } from '@angular/common/http';
import { CreateUpdatePost } from '../_models/CreateUpdatePost';
import { Observable } from 'rxjs';
import { SocialHubService } from './socialhub.service';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private socialHubService: SocialHubService) {}

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


}
