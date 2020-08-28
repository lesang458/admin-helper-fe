import { Action } from '@ngrx/store';
import { DayOff } from 'src/app/shared/models/dayoff.model';

export const GET_DAYOFF_SUCCESS = '[Dayoff] Get Day off Success';
export const FETCH_DAY_OFF = '[Dayoff] Fetch Day Off';

export class GetDayOffSuccess implements Action {
  readonly type = GET_DAYOFF_SUCCESS;
  constructor(public payload: DayOff[]) {}
}
export class FetchDayOff implements Action {
  readonly type = FETCH_DAY_OFF;
}

export type DayOffActions = GetDayOffSuccess | FetchDayOff;
