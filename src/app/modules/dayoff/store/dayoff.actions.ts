import { Action } from '@ngrx/store';
import { DayOff } from 'src/app/shared/models/dayoff.model';

export const GET_DAYOFF_SUCCESS = '[Dayoff] Get Day off Success';
export const CREATE_DAY_OFF = '[Dayoff] Create Day off';
export const UPDATE_DAY_OFF = '[Dayoff] Update Day off';
export const DELETE_DAY_OFF = '[Dayoff] Delete Day off';
export const FETCH_DAY_OFF = '[Dayoff] Fetch Day Off';

export class GetDayOffSuccess implements Action {
  readonly type = GET_DAYOFF_SUCCESS;
  constructor(public payload: DayOff[]) {}
}
export class CreateDayOff implements Action {
  readonly type = CREATE_DAY_OFF;
  constructor(public payload: DayOff) {}
}
export class UpdateDayOff implements Action {
  readonly type = UPDATE_DAY_OFF;
  constructor(public payload: DayOff) {}
}
export class DeleteDayOff implements Action {
  readonly type = DELETE_DAY_OFF;
  constructor(public payload: string) {}
}
export class FetchDayOff implements Action {
  readonly type = FETCH_DAY_OFF;
}
export type DayOffActions =
  | GetDayOffSuccess
  | FetchDayOff
  | CreateDayOff
  | UpdateDayOff
  | DeleteDayOff;
