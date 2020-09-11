import { Action } from '@ngrx/store';
import { Device } from 'src/app/shared/models/device.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';

export interface SearchDevice {
  page;
  perPage;
  status: string;
  deviceCategoryId;
}

export interface DeviceParams {
  id;
  device: Device;
  params: SearchDevice;
}

export interface DeviceAssignParams {
  id;
  userId;
  params: SearchDevice;
}

export const FETCH_DEVICES = '[Devices] Fetch Devices';
export const SET_DEVICES = '[Devices] Set Devices';
export const FETCH_DEVICE_CATEGORIES = '[Devices] Fetch Device Categories';
export const SET_DEVICE_CATEGORIES = '[Devices] Set Device Categories';
export const ASSIGNED_DEVICE = '[Devices] Asigned Device';
export const EDIT_DEVICE = '[Devices] Edit Device';
export const CREATE_DEVICE = '[Devices] Create Device';

export class FetchDevices implements Action {
  public readonly type = FETCH_DEVICES;
  constructor(public payload: SearchDevice) {}
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
  constructor(public payload: DeviceAssignParams) {}
} 
export class EditDevice implements Action {
  public readonly type = EDIT_DEVICE;
  constructor(public payload: DeviceParams) {}
}

export class CreateDevice implements Action {
  public readonly type = CREATE_DEVICE;
  constructor(public payload: DeviceParams) {}
}

export type DevicesActions =
  | FetchDevices
  | SetDevices
  | FetchDeviceCategories
  | SetDeviceCategories
  | AssignDevice
  | EditDevice
  | CreateDevice;
