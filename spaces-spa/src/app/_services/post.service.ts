import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../_models/Post';
import { HttpClient } from '@angular/common/http';
import { CreateUpdatePost } from '../_models/CreateUpdatePost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl = environment.apiUrl;

  /**
   *
   */
  constructor(private http: HttpClient) {}

  createPost(post: CreateUpdatePost): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}post`, post);
  }

  updatePost(id: number, post: CreateUpdatePost) {
    return this.http.put(`${this.baseUrl}post/${id}`, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}post`);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}post/${id}`);
  }
}
