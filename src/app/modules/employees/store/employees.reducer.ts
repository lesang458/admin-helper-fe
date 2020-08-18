import * as EmployeesAction from './employees.actions';

export const initialState = {
  employees: [],
};

export function EmployeesReducer(
  state = initialState,
  action: EmployeesAction.GetEmployees
) {
  switch (action.type) {
    case EmployeesAction.GET_EMPLOYEES:
      return [...state.employees, action.payload];
    default:
      return state;
  }
}
