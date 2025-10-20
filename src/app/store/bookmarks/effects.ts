import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { BookmarksService } from '../../api/bookmarks.service';
import {
  getListAction,
  getListFailedAction,
  getListSuccessAction,
} from './actions';

@Injectable()
export class BookmarksEffects {
  private readonly bookmarksService = inject(BookmarksService);
  private readonly actions$ = inject(Actions);

  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListAction),
      switchMap(() =>
        this.bookmarksService.getFiltered('').pipe(
          map((bookmarks) => getListSuccessAction({ bookmarks })),
          catchError((error) => of(getListFailedAction(error.message))),
        ),
      ),
    ),
  );

  getListFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getListFailedAction),
        tap((payload) => console.error(payload.msg)),
      ),
    { dispatch: false },
  );
}
