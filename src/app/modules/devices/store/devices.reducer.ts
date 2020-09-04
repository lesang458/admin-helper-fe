import * as DevicesActions from './devices.actions';
import { Device } from 'src/app/shared/models/device.model';
import {
  PaginatedData,
  Pagination,
} from 'src/app/shared/models/pagination.model';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';

export interface State {
  devices: PaginatedData<Device[]>;
  categories: DeviceCategory[];
}

const initDevices = new PaginatedData<Device[]>();
initDevices.data = [];
const pagination: Pagination = {
  totalCount: 0,
};
initDevices.pagination = pagination;

export const initialState: State = {
  devices: initDevices,
  categories: [],
};

export function deviceReducer(
  state: State = initialState,
  action: DevicesActions.DevicesActions
) {
  switch (action.type) {
    case DevicesActions.SET_DEVICES:
      return {
        ...state,
        devices: action.payload,
      };
    case DevicesActions.SET_DEVICE_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
      };
    default:
      return state;
  }
}
