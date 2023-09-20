import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/User';
import { Token } from '../_models/Token';
import { Credentials } from '../_models/Credentials';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(model: Credentials): Observable<Token> {
    return this.http.post<Token>(this.baseUrl + 'account/login', model);
  }

  register(model: Credentials): Observable<Token> {
    return this.http.post<Token>(this.baseUrl + 'account/register', model);
  }

  setCurrentUser(token: Token): User {
    const decodedToken = this.getDecodedToken(token.token);

    let user: User = {
      roles: decodedToken.role,
      id: decodedToken.nameid,
      username: decodedToken.unique_name,
      token: token.token,
    };

    localStorage.setItem('token', JSON.stringify(token));

    return user;
  }

  logout() {
    localStorage.removeItem('user');
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
