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
    case EmployeesActions.REQUEST_DAY_OFF:
      let hoursOff;
      if (action.payload.hoursPerDay === 4) {
        hoursOff = 4;
      } else {
        if (action.payload.fromDate === action.payload.toDate) {
          hoursOff = 8;
        } else {
          hoursOff =
            8 *
            ((new Date(action.payload.toDate).getTime() -
              new Date(action.payload.fromDate).getTime()) /
              86400000 +
              1);
        }
      }
      return {
        ...state,
        dayOff: {
          pagination: { ...state.dayOff.pagination },
          data: state.dayOff.data.map((item) => {
            return item.id == action.payload.id
              ? {
                  ...item,
                  hours: item.hours.map((i) => {
                    console.log(i.category === action.payload.dayOffInfoId);

                    if (i.category === action.payload.dayOffInfoId) {
                      i = {
                        ...i,
                        availableHours:
                          i.availableHours > hoursOff
                            ? i.availableHours - hoursOff
                            : 0,
                      };
                      console.log(i);
                    }
                    return i;
                  }),
                }
              : item;
          }),
        },
      };
    default:
      return state;
  }
}
