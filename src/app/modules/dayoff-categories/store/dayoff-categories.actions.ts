import { Action } from '@ngrx/store';
import { DayOff } from 'src/app/shared/models/dayoff.model';

export const GET_DAYOFF_CATEGORIES_SUCCESS =
  '[Dayoff] Get Day off categories Success';
export const CREATE_DAY_OFF_CATEGORIES =
  '[Dayoff categories] Create Day off categories';
export const UPDATE_DAY_OFF_CATEGORIES =
  '[Dayoff categories] Update Day off categories';
export const DELETE_DAY_OFF_CATEGORIES =
  '[Dayoff categories] Delete Day off categories';
export const FETCH_DAY_OFF_CATEGORIES =
  '[Dayoff categories] Fetch Day Off categories';

export class GetDayOffSuccess implements Action {
  readonly type = GET_DAYOFF_CATEGORIES_SUCCESS;
  constructor(public payload: DayOff[]) {}
}
export class CreateDayOff implements Action {
  readonly type = CREATE_DAY_OFF_CATEGORIES;
  constructor(public payload: DayOff) {}
}
export class UpdateDayOff implements Action {
  readonly type = UPDATE_DAY_OFF_CATEGORIES;
  constructor(public payload: DayOff) {}
}
export class DeleteDayOff implements Action {
  readonly type = DELETE_DAY_OFF_CATEGORIES;
  constructor(public payload: string) {}
}
export class FetchDayOff implements Action {
  readonly type = FETCH_DAY_OFF_CATEGORIES;
}
export type DayOffActions =
  | GetDayOffSuccess
  | FetchDayOff
  | CreateDayOff
  | UpdateDayOff
  | DeleteDayOff;
