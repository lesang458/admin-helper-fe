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
  params: SearchDevice;
  device?: Device;
}

export interface DeviceCategoryParams {
  id: number;
  deviceCategory: DeviceCategory;
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
export const DISCARD_DEVICE = '[Devices] Discard Device';
export const MOVE_DEVICE_TO_INVENTORY = '[Devices] Move Device To Inventory';
export const CREATE_DEVICE_CATEGORY = '[Device] Create Device Category';
export const UPDATE_DEVICE_CATEGORY = '[Device] Update Device Category';
export const DELETE_DEVICE_CATEGORY = '[Device] Delete Device Category';

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

export class DiscardDevice implements Action {
  public readonly type = DISCARD_DEVICE;
  constructor(public payload: DeviceParams) {}
}

export class MoveDeviceToInventory implements Action {
  public readonly type = MOVE_DEVICE_TO_INVENTORY;
  constructor(public payload: DeviceParams) {}
}
export class CreateDeviceCategory implements Action {
  readonly type = CREATE_DEVICE_CATEGORY;
  constructor(public payload: DeviceCategory) {}
}
export class UpdateDeviceCategory implements Action {
  readonly type = UPDATE_DEVICE_CATEGORY;
  constructor(public payload: DeviceCategoryParams) {}
}
export class DeleteDeviceCategory implements Action {
  readonly type = DELETE_DEVICE_CATEGORY;
  constructor(public payload: string) {}
}

export type DevicesActions =
  | FetchDevices
  | SetDevices
  | FetchDeviceCategories
  | SetDeviceCategories
  | AssignDevice
  | EditDevice
  | CreateDevice
  | DiscardDevice
  | MoveDeviceToInventory
  | CreateDeviceCategory
  | UpdateDeviceCategory
  | DeleteDeviceCategory;
