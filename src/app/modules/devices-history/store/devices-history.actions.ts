import { Action } from '@ngrx/store';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';

export const GET_DEVICE_HISTORY_SUCCESS =
  '[Device History] Get Device History Success';
export const FETCH_DEVICE_HISTORY = '[Device History] Fetch Device History';

export class GetDeviceHistorySuccess implements Action {
  readonly type = GET_DEVICE_HISTORY_SUCCESS;
  constructor(public payload: PaginatedData<DeviceHistory[]>) {}
}

export class FetchDeviceHistory implements Action {
  readonly type = FETCH_DEVICE_HISTORY;
}
export type DevicesHistoryActions =
  | GetDeviceHistorySuccess
  | FetchDeviceHistory;
