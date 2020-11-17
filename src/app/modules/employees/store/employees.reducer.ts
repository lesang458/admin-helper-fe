import * as EmployeesActions from './employees.actions';
import { Employee } from 'src/app/shared/models/employees.model';
import {
  PaginatedData,
  Pagination,
} from 'src/app/shared/models/pagination.model';
import { DayOffRequest } from 'src/app/shared/models/dayoff-request.model';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { Device } from 'src/app/shared/models/device.model';

export interface State {
  employees: Employee[];
  meta: {};
  dayOff: PaginatedData<Employee[]>;
  detaiEmployee: Employee;
  dayOffRequest: PaginatedData<DayOffRequest[]>;
  deviceHistories: DeviceHistory[];
  devices: Device[];
}

const initDayOff = new PaginatedData<Employee[]>();
initDayOff.data = [];
const initDayOffRequest = new PaginatedData<DayOffRequest[]>();
initDayOffRequest.data = [];
const pagination: Pagination = {
  totalCount: 0,
};
initDayOff.meta = pagination;

export const initialState: State = {
  employees: [],
  meta: {},
  dayOff: initDayOff,
  detaiEmployee: null,
  dayOffRequest: initDayOffRequest,
  deviceHistories: [],
  devices: [],
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
        meta: action.payload.meta,
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
    case EmployeesActions.SET_DAY_OFF_REQUEST:
      return {
        ...state,
        dayOffRequest: action.payload,
      };
    case EmployeesActions.SET_EMPLOYEE_DEVICE_HISTORIES:
      return {
        ...state,
        deviceHistories: action.payload,
      };
    case EmployeesActions.SET_EMPLOYEE_DEVICES:
      return {
        ...state,
        devices: action.payload,
      };
    default:
      return state;
  }
}
