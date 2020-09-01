import { ActionReducerMap } from '@ngrx/store';
import * as fromEmployee from '../modules/employees/store/employees.reducer';
import * as fromAuth from '../shared/store/auth.reducer';
import * as fromDayoffCategory from '../modules/dayoff-categories/store/dayoff-categories.reducer';

export interface AppState {
  employees: fromEmployee.State;
  auth: fromAuth.State;
  dayoffCategories: fromDayoffCategory.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  employees: fromEmployee.employeeReducer,
  auth: fromAuth.authReducer,
  dayoffCategories: fromDayoffCategory.dayoffCategoriesReducer,
};
