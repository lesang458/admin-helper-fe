import { Action } from '@ngrx/store';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';

export interface DeviceCategoryParams {
  id: number;
  deviceCategory: DeviceCategory;
}

export const GET_DEVICE_CATEGORIES_SUCCESS =
  '[Device Categories] Get Device categories Success';
export const CREATE_DEVICE_CATEGORY =
  '[Device Categories] Create Device Category';
export const UPDATE_DEVICE_CATEGORY =
  '[Device Categories] Update Device Category';
export const DELETE_DEVICE_CATEGORY =
  '[Device Categories] Delete Device Category';
export const FETCH_DEVICE_CATEGORIES =
  '[Device Categories] Fetch Device Categories';

export class GetDeviceCategoriesSuccess implements Action {
  readonly type = GET_DEVICE_CATEGORIES_SUCCESS;
  constructor(public payload: DeviceCategory[]) {}
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
export class FetchDeviceCategories implements Action {
  readonly type = FETCH_DEVICE_CATEGORIES;
}
export type DeviceCategoriesActions =
  | GetDeviceCategoriesSuccess
  | FetchDeviceCategories
  | CreateDeviceCategory
  | UpdateDeviceCategory
  | DeleteDeviceCategory;
