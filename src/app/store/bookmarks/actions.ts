import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../models/bookmarks/bookmark';

export enum ActionTypes {
  GET_LIST = '[Bookmarks] Get list',
  GET_LIST_SUCCESS = '[Bookmarks] Get list success',
  GET_LIST_FAILED = '[Bookmarks] Get list failed',
}

export const getListAction = createAction(ActionTypes.GET_LIST);

export const getListSuccessAction = createAction(
  ActionTypes.GET_LIST_SUCCESS,
  props<{ bookmarks: Bookmark[] }>(),
);

export const getListFailedAction = createAction(
  ActionTypes.GET_LIST_FAILED,
  props<{ msg: string }>(),
);
