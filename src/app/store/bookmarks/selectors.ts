import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

export const bookmarksState = (state: AppState) => state.bookmarksState;

export const selectBookmarks = createSelector(
    bookmarksState,
  (state) => state.bookmarks.domain || []
);
