import { map } from 'rxjs/operators';
import * as EmployeesActions from './employees.actions';
import { Employee } from 'src/app/shared/models/employees.model';
import {
  PaginatedData,
  Pagination,
} from 'src/app/shared/models/pagination.model';

export interface State {
  employees: Employee[];
  pagination: {};
  dayOff: PaginatedData<Employee[]>;
  detaiEmployee: Employee;
}

const initDayOff = new PaginatedData<Employee[]>();
initDayOff.data = [];
const pagination: Pagination = {
  totalCount: 0,
};
initDayOff.pagination = pagination;

export const initialState: State = {
  employees: [],
  pagination: {},
  dayOff: initDayOff,
  detaiEmployee: null,
};

export function employeeReducer(
  state: State = initialState,
  action: EmployeesActions.EmployeesActions
) {
  switch (action.type) {
    case EmployeesActions.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: [...action.payload.data],
        pagination: action.payload.pagination,
      };
    case EmployeesActions.SET_DAY_OFF:
      return {
        ...state,
        dayOff: action.payload,
      };
    case EmployeesActions.DETAIL_EMPLOYEE_SUCCESS:
      return {
        ...state,
        detaiEmployee: action.payload,
      };
    case EmployeesActions.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [
          ...state.employees.map((i) => {
            if (i.id == action.payload.id) {
              return {
                ...i,
                status: action.payload.status,
              };
            }
            return i;
          }),
        ],
      };
    default:
      return state;
  }
}
