import { Action } from '@ngrx/store';
import { Device } from 'src/app/shared/models/device.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';

export interface DeviceParams {
  page;
  perPage;
  deviceCategoryId;
}

export const FETCH_DEVICES = '[Devices] Fetch Devices';
export const SET_DEVICES = '[Devices] Set Devices';
export const FETCH_DEVICE_CATEGORIES = '[Devices] Fetch Device Categories';
export const SET_DEVICE_CATEGORIES = '[Devices] Set Device Categories';
export const ASSIGNED_DEVICE = '[Devices] Asigned Device';

export class FetchDevices implements Action {
  public readonly type = FETCH_DEVICES;
  constructor(public payload: DeviceParams) {}
}

export class SetDevices implements Action {
  public readonly type = SET_DEVICES;
  constructor(public payload: PaginatedData<Device[]>) {}
}

export class FetchDeviceCategories implements Action {
  public readonly type = FETCH_DEVICE_CATEGORIES;
}

export class SetDeviceCategories implements Action {
  public readonly type = SET_DEVICE_CATEGORIES;
  constructor(public payload: DeviceCategory[]) {}
}

export class AssignDevice implements Action {
  public readonly type = ASSIGNED_DEVICE;
  constructor(public payload: {id, userId}) {}
}

export type DevicesActions =
  | FetchDevices
  | SetDevices
  | FetchDeviceCategories
  | SetDeviceCategories
  | AssignDevice;
