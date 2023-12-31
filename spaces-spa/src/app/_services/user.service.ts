import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/User';
import { Profile } from '../_models/Profile';
import { FollowedUsers } from '../_models/FollowedUsers';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(searchTerm?: string): Observable<User[]> {
    let params = new HttpParams();

    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }
    return this.http.get<User[]>(`${this.baseUrl}user`, { params });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}user/${id}`);
  }

  updateProfile(id: number, profile: Profile) {
    return this.http.patch(`${this.baseUrl}user/${id}`, profile);
  }

  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}user/${id}/profile`);
  }

  getFollowedUsers(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}user/${id}/followed`);
  }

  // getFollowedByUsers(id: number): Observable<FollowedUsers[]> {
  //   return this.http.get<FollowedUsers[]>(`${this.baseUrl}user/${id}/followedby`);
  // }

  follow(followedUser: FollowedUsers) {
    return this.http.post(
      `${this.baseUrl}user/${followedUser.sourceUserId}/follow`,
      followedUser
    );
  }

  unfollow(followedUser: FollowedUsers) {
    return this.http.post(
      `${this.baseUrl}user/${followedUser.sourceUserId}/unfollow`,
      followedUser
    );
  }
}
