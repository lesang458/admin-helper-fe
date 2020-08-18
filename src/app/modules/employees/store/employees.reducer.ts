import * as EmployeesAction from './employees.actions';

export const initialState = {
  employees: [],
};

export function EmployeesReducer(
  state = initialState,
  action: EmployeesAction.EmployeesList
) {
  switch (action.type) {
    case EmployeesAction.LIST_EMPLOYEES:
      return [...state.employees, action.payload];
    default:
      return state;
  }
}
