import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, first, map, of, switchMap } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/User';
import { AppState } from '../_ngrx/selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store
      .select((appstate) => appstate.spaces.user)
      .pipe(
        switchMap((user) => {
          if (user?.token) {
            req = req.clone({
              setHeaders: { Authorization: 'Bearer ' + user.token },
            });
          }

          return next.handle(req);
        })
      );
  }
}
