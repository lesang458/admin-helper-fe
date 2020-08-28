import { ActionReducerMap } from '@ngrx/store';
import * as fromEmployee from '../modules/employees/store/employees.reducer';
import * as fromDayoff from '../modules/dayoff/store/dayoff.reducer';

export interface AppState {
  employees: fromEmployee.State;
}
export interface AppState {
  dayoff: fromDayoff.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  employees: fromEmployee.employeeReducer,
  dayoff: fromDayoff.dayoffReducer,
};
