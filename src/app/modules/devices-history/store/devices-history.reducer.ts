import * as DevicesHistoryActions from '../store/devices-history.actions';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';

export interface State {
  deviceHistory: DeviceHistory[];
  pagination: {};
}

export const initialState: State = {
  deviceHistory: [],
  pagination: {},
};

export function devicesHistoryReducer(
  state: State = initialState,
  action: DevicesHistoryActions.DevicesHistoryActions
) {
  switch (action.type) {
    case DevicesHistoryActions.GET_DEVICE_HISTORY_SUCCESS:
      return {
        ...state,
        deviceHistory: [...action.payload.data],
        pagination: action.payload.pagination,
      };
    default:
      return state;
  }
}
