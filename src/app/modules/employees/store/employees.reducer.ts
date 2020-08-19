import * as EmployeesAction from './employees.actions';
import { Employee } from 'src/app/shared/models/employees.model';

export interface State {
  employees: Employee[];
}

export const initialState: State = {
  employees: [],
};

export function employeeReducer(
  state: State = initialState,
  action: EmployeesAction.GetEmployeesSuccess
) {
  switch (action.type) {
    case EmployeesAction.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: [...action.payload],
      };
    default:
      return state;
  }
}
