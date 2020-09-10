import { ActionReducerMap } from '@ngrx/store';
import * as fromEmployee from '../modules/employees/store/employees.reducer';
import * as fromDevices from '../modules/devices/store/devices.reducer';
import * as fromAuth from '../shared/store/auth.reducer';
import * as fromDayoffCategory from '../modules/dayoff-categories/store/dayoff-categories.reducer';
import * as fromDeviceHistory from '../modules/devices-history/store/devices-history.reducer';
import * as fromDeviceCategories from '../modules/device-categories/store/device-categories.reducer';

export interface AppState {
  employees: fromEmployee.State;
  devices: fromDevices.State;
  auth: fromAuth.State;
  dayoffCategories: fromDayoffCategory.State;
  deviceHistory: fromDeviceHistory.State;
  deviceCategories: fromDeviceCategories.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  employees: fromEmployee.employeeReducer,
  devices: fromDevices.deviceReducer,
  auth: fromAuth.authReducer,
  dayoffCategories: fromDayoffCategory.dayoffCategoriesReducer,
  deviceHistory: fromDeviceHistory.devicesHistoryReducer,
  deviceCategories: fromDeviceCategories.deviceCategoriesReducer,
};
