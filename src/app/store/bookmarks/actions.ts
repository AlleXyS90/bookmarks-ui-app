import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../models/bookmarks/bookmark';

export enum ActionTypes {
  GET_LIST = '[Bookmarks] Get list',
  GET_LIST_SUCCESS = '[Bookmarks] Get list success',
  GET_LIST_FAILED = '[Bookmarks] Get list failed',
  ADD = '[Bookmarks] Add',
  ADD_SUCCESS = '[Bookmarks] Add success',
  ADD_FAILED = '[Bookmarks] Add failed',
}

export const getListAction = createAction(
  ActionTypes.GET_LIST,
  props<{ keyword: string }>(),
);

export const getListSuccessAction = createAction(
  ActionTypes.GET_LIST_SUCCESS,
  props<{ bookmarks: Bookmark[] }>(),
);

export const getListFailedAction = createAction(
  ActionTypes.GET_LIST_FAILED,
  props<{ msg: string }>(),
);

export const addAction = createAction(
  ActionTypes.ADD,
  props<{ bookmark: Bookmark }>(),
);

export const addSuccessAction = createAction(ActionTypes.ADD_SUCCESS);

export const addFailedAction = createAction(
  ActionTypes.ADD_FAILED,
  props<{ msg: string }>(),
);
