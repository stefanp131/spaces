import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  of,
  withLatestFrom,
} from 'rxjs';
import { CommentsService } from 'src/app/_services/comment.service';
import { Store } from '@ngrx/store';
import {
  selectUser,
} from 'src/app/account/account-state/account.selectors';
import { AppState, closeHubs, closeHubsError, closeHubsSuccess, openHubs, openHubsError, openHubsSuccess } from 'src/app/app-state';
import { PostsService } from './_services/post.service';
import { SocialHubService } from 'src/app/_services/socialhub.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private socialHubService: SocialHubService
  ) {}

  openHubs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openHubs),
      withLatestFrom(this.store.select(selectUser)),
      map(([action , user]) => {
        this.socialHubService.createHubConnection(user);
        return openHubsSuccess();
      }),
      catchError((error) => {
        return of(openHubsError({ error }));
      })
    )
  );

  closeHubs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeHubs),
      map(() => {
        this.socialHubService.stopHubConnection();
        return closeHubsSuccess();
      }),
      catchError((error) => {
        return of(closeHubsError({ error }));
      })
    )
  );

}
