import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { BookmarksService } from '../../api/bookmarks.service';
import {
  addAction,
  addFailedAction,
  addSuccessAction,
  getListAction,
  getListFailedAction,
  getListSuccessAction,
} from './actions';
import { Routes } from '../../_shared/routes';

@Injectable()
export class BookmarksEffects {
  private readonly store = inject(Store);
  private readonly bookmarksService = inject(BookmarksService);
  private readonly router = inject(Router);
  private readonly actions$ = inject(Actions);

  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListAction),
      switchMap((payload) =>
        this.bookmarksService.getFiltered(payload.keyword).pipe(
          map((bookmarks) => getListSuccessAction({ bookmarks })),
          catchError((error) =>
            of(getListFailedAction(error.message || 'Something went wrong!')),
          ),
        ),
      ),
    ),
  );

  getListFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getListFailedAction),
        tap((payload) => console.error(payload?.msg)),
      ),
    { dispatch: false },
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAction),
      switchMap((payload) =>
        this.bookmarksService.add(payload.bookmark).pipe(
          map(() => addSuccessAction()),
          catchError((error) =>
            of(getListFailedAction(error.message || 'Something went wrong!')),
          ),
        ),
      ),
    ),
  );

  addSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSuccessAction),
        tap(() => {
          this.router.navigateByUrl(Routes.bookmarks.root);
          this.store.dispatch(getListAction({keyword: ''}))
        }),
      ),
    { dispatch: false },
  );

  addFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addFailedAction),
        tap((payload) => console.error(payload?.msg)),
      ),
    { dispatch: false },
  );
}
