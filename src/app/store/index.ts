import {ActionReducerMap} from '@ngrx/store';

import * as fromBookmarks from './bookmarks';

export interface AppState {
  bookmarksState: fromBookmarks.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    bookmarksState: fromBookmarks.reducer,
};
