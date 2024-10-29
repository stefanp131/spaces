import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, first, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { selectUser } from '../account/account-state/account.selectors';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store
      .select(selectUser)
      .pipe(
        first(),
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
