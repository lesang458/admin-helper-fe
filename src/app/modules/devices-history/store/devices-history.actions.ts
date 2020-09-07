import { Action } from '@ngrx/store';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';

export interface SearchParams {
  userId?: number;
  deviceCategoryId?;
  page?;
  perPage?;
  status?: string;
  historyTo?: string;
  historyFrom?: string;
}

export const GET_DEVICE_HISTORY_SUCCESS =
  '[Device History] Get Device History Success';
export const FETCH_DEVICE_HISTORY = '[Device History] Fetch Device History';
export const DETAIL_DEVICE_HISTORY = '[Device History] Detail Device History';
export const DETAIL_DEVICE_HISTORY_SUCCESS = '[Device History] Detail Device History Success';

export class GetDeviceHistorySuccess implements Action {
  readonly type = GET_DEVICE_HISTORY_SUCCESS;
  constructor(public payload: PaginatedData<DeviceHistory[]>) {}
}

export class FetchDeviceHistory implements Action {
  readonly type = FETCH_DEVICE_HISTORY;
  constructor(public payload: SearchParams) {}
}

export class DetailDeviceHistory implements Action {
  readonly type = DETAIL_DEVICE_HISTORY;
  constructor(public payload: number) {}
}

export class DetailDeviceHistorySuccess implements Action {
  readonly type = DETAIL_DEVICE_HISTORY_SUCCESS;
  constructor(public payload: DeviceHistory) {}
}

export type DevicesHistoryActions =
  | GetDeviceHistorySuccess
  | FetchDeviceHistory
  | DetailDeviceHistory
  | DetailDeviceHistorySuccess;
