import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccountAppState } from '../account/account-state/account.selectors';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<AccountAppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store
      .select((appstate) => appstate.account.user)
      .pipe(
        mergeMap((user) => {
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
