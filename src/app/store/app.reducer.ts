import { ActionReducerMap } from '@ngrx/store';
import * as fromEmployee from '../modules/employees/store/employees.reducer';
import * as fromDevices from '../modules/devices/store/devices.reducer';

export interface AppState {
  employees: fromEmployee.State;
  devices: fromDevices.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  employees: fromEmployee.employeeReducer,
  devices: fromDevices.deviceReducer,
};
