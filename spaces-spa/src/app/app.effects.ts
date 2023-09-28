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
import { LikesService } from 'src/app/_services/likes.service';
import { AppState, closeHubs, closeHubsError, closeHubsSuccess, openHubs, openHubsError, openHubsSuccess } from 'src/app/app-state';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private likesService: LikesService,
    private commentService: CommentsService,
    private store: Store<AppState>
  ) {}

  openHubs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openHubs),
      withLatestFrom(this.store.select(selectUser)),
      map(([action , user]) => {
        this.likesService.createHubConnection(user);
        this.commentService.createHubConnection(user);

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
        this.likesService.stopHubConnection();
        this.commentService.stopHubConnection();

        return closeHubsSuccess();
      }),
      catchError((error) => {
        return of(closeHubsError({ error }));
      })
    )
  );

}
