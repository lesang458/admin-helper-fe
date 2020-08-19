import { ActionReducerMap } from '@ngrx/store';
import * as fromEmployee from '../modules/employees/store/employees.reducer';

export interface AppState {
  employees: fromEmployee.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  employees: fromEmployee.employeeReducer,
};
