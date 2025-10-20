import { createReducer, on } from '@ngrx/store';

import {
  getListAction,
  getListFailedAction,
  getListSuccessAction,
} from './actions';
import { initialState } from './state';
import { Status } from '../../models/domain-status';

export const reducer = createReducer(
  initialState,
  on(getListAction, (state) => ({
    ...state,
    bookmarks: {
      domain: undefined,
      requestStatus: {
        errorMessage: undefined,
        status: Status.PENDING,
      },
    },
  })),
  on(getListSuccessAction, (state, { bookmarks }) => ({
    ...state,
    bookmarks: {
      domain: bookmarks,
      requestStatus: {
        errorMessage: undefined,
        status: Status.COMPLETED,
      },
    },
  })),
  on(getListFailedAction, (state, { msg }) => ({
    ...state,
    bookmarks: {
      domain: undefined,
      requestStatus: {
        errorMessage: msg,
        status: Status.COMPLETED,
      },
    },
  })),
);
