import { Action } from '@ngrx/store';
import { Device } from 'src/app/shared/models/device.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';

export interface DeviceParams {
  page;
  perPage;
  deviceCategoryId;
}

export const FETCH_DEVICES = '[Devices] Fetch Devices';
export const SET_DEVICES = '[Devices] Set Devices';

export class FetchDevices implements Action {
  public readonly type = FETCH_DEVICES;
  constructor(public payload: DeviceParams) {}
}

export class SetDevices implements Action {
  public readonly type = SET_DEVICES;
  constructor(public payload: PaginatedData<Device[]>) {}
}

export type DevicesActions = FetchDevices | SetDevices;
