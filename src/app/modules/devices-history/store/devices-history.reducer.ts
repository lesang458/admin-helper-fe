import * as DevicesHistoryActions from '../store/devices-history.actions';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import {
  PaginatedData,
  Pagination,
} from 'src/app/shared/models/pagination.model';

export interface State {
  deviceHistory: PaginatedData<DeviceHistory[]>;
  detailDeviceHistory: DeviceHistory;
}

const initDevices = new PaginatedData<DeviceHistory[]>();
initDevices.data = [];
const pagination: Pagination = {
  totalCount: 0,
};
initDevices.meta = pagination;

export const initialState: State = {
  deviceHistory: initDevices,
  detailDeviceHistory: null,
};

export function devicesHistoryReducer(
  state: State = initialState,
  action: DevicesHistoryActions.DevicesHistoryActions
) {
  switch (action.type) {
    case DevicesHistoryActions.GET_DEVICE_HISTORY_SUCCESS:
      return {
        ...state,
        deviceHistory: action.payload,
      };
    case DevicesHistoryActions.DETAIL_DEVICE_HISTORY_SUCCESS:
      return {
        ...state,
        detailDeviceHistory: action.payload,
      };
    default:
      return state;
  }
}
