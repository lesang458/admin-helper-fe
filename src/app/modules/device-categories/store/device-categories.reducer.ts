import * as DeviceActions from '../store/device-categories.actions';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';

export interface State {
  deviceCategories: DeviceCategory[];
}

export const initialState: State = {
  deviceCategories: [],
};

export function deviceCategoriesReducer(
  state: State = initialState,
  action: DeviceActions.DeviceCategoriesActions
) {
  switch (action.type) {
    case DeviceActions.GET_DEVICE_CATEGORIES_SUCCESS:
      return {
        ...state,
        deviceCategories: [...action.payload],
      };
    default:
      return state;
  }
}
