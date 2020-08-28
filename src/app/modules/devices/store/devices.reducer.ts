import * as DevicesActions from './devices.actions';
import { Device } from 'src/app/shared/models/device.model';
import {
  PaginatedData,
  Pagination,
} from 'src/app/shared/models/pagination.model';

export interface State {
  devices: PaginatedData<Device[]>;
}

const initDevices = new PaginatedData<Device[]>();
initDevices.data = [];
const pagination: Pagination = {
  totalCount: 0,
};
initDevices.pagination = pagination;

export const initialState: State = {
  devices: initDevices,
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
    default:
      return state;
  }
}
