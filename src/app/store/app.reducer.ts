import { ActionReducerMap } from '@ngrx/store';
import * as fromEmployee from '../modules/employees/store/employees.reducer';
import * as fromLogin from '../shared/store/login.reducer';

export interface AppState {
  employees: fromEmployee.State;
  login: fromLogin.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  employees: fromEmployee.employeeReducer,
  login: fromLogin.loginReducer,
};
