import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { RequestDayOffModel } from 'src/app/shared/models/request-day-off.model';
import { DayOffRequest } from 'src/app/shared/models/dayoff-request.model';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { Device } from 'src/app/shared/models/device.model';

export interface SearchParams {
  search?: string;
  page?;
  perPage?;
  dayOffCategoryId?;
  sort?: { sortNameType; sortBirthDateType; sortJoinDateType };
  status?: string;
  fromDate?: string;
  toDate?: string;
  userId?;
  fullInfo?: string;
  month?: Date;
}

export interface EmployeesParam {
  id?: number;
  employee?: Employee;
  searchParams?: SearchParams;
  status?: string;
  isAccountInfo?: boolean;
}

export const GET_EMPLOYEES_SUCCESS = '[Employees] Get Employees Success';
export const SEARCH_EMPLOYEES = '[Employees] Search Employees';
export const FETCH_DAY_OFF = '[Employees] Fetch Day Off';
export const SET_DAY_OFF = '[Employees] Set Day Off';
export const CREATE_EMPLOYEE = '[Employees] Create Employee';
export const UPDATE_EMPLOYEE_STATUS = '[Employees] Update Employee Status';
export const DETAIL_EMPLOYEE = '[Employees] Detail Employee';
export const DETAIL_EMPLOYEE_SUCCESS = '[Employees] Detail Employee Success';
export const EDIT_EMPLOYEE = '[Employees] Edit Employee';
export const REQUEST_DAY_OFF = '[Employees] Request Day Off';
export const UPDATE_REQUEST_DAY_OFF = '[Employees] Update Request Day Off';
export const FETCH_EMPLOYEE_DEVICE_HISTORIES =
  '[Employees] Fetch Employee Device Histories';
export const SET_EMPLOYEE_DEVICE_HISTORIES =
  '[Employees] Set Employee Device Histories';
export const FETCH_EMPLOYEE_DEVICES = '[Employees] Fetch Employee Devices';
export const SET_EMPLOYEE_DEVICES = '[Employees] Set Employee Devices';
export const FETCH_DAY_OFF_REQUEST = '[Employees] Fetch Day Off Request';
export const SET_DAY_OFF_REQUEST = '[Employees] Set Day Off Request';
export const APPROVE_REQUEST = '[Employees] Approve Day Off Request';
export const CANCEL_REQUEST = '[Employees] Cancel Day Off Request';
export const DENY_REQUEST = '[Employees] Deny Day Off Request';
export const DELETE_REQUEST = '[Employees] Delete Day Off Request';

export class GetEmployeesSuccess implements Action {
  readonly type = GET_EMPLOYEES_SUCCESS;
  constructor(public payload: PaginatedData<Employee[]>) {}
}

export class SearchEmployees implements Action {
  readonly type = SEARCH_EMPLOYEES;
  constructor(public payload: SearchParams) {}
}

export class FetchDayOff implements Action {
  readonly type = FETCH_DAY_OFF;
  constructor(public payload: SearchParams) {}
}

export class SetDayOff implements Action {
  readonly type = SET_DAY_OFF;
  constructor(public payload: PaginatedData<Employee[]>) {}
}

export class CreateEmployee implements Action {
  readonly type = CREATE_EMPLOYEE;
  constructor(public payload: EmployeesParam) {}
}

export class UpdateEmployeeStatus implements Action {
  readonly type = UPDATE_EMPLOYEE_STATUS;
  constructor(public payload: EmployeesParam) {}
}

export class DetailEmployee implements Action {
  readonly type = DETAIL_EMPLOYEE;
  constructor(public payload: number) {}
}

export class DetailEmployeeSuccess implements Action {
  readonly type = DETAIL_EMPLOYEE_SUCCESS;
  constructor(public payload: Employee) {}
}

export class EditEmployee implements Action {
  readonly type = EDIT_EMPLOYEE;
  constructor(public payload: EmployeesParam) {}
}
export class RequestDayOff implements Action {
  readonly type = REQUEST_DAY_OFF;
  constructor(
    public payload: {
      body: RequestDayOffModel;
      searchParams: SearchParams;
      id: number;
    }
  ) {}
}
export class UpdateRequestDayOff implements Action {
  readonly type = UPDATE_REQUEST_DAY_OFF;
  constructor(
    public payload: {
      body: RequestDayOffModel;
      searchParams: SearchParams;
      id: number;
    }
  ) {}
}

export class FetchEmployeeDeviceHistories implements Action {
  readonly type = FETCH_EMPLOYEE_DEVICE_HISTORIES;
  constructor(public payload: number) {}
}

export class SetEmployeeDeviceHistories implements Action {
  readonly type = SET_EMPLOYEE_DEVICE_HISTORIES;
  constructor(public payload: DeviceHistory[]) {}
}

export class FetchEmployeeDevices implements Action {
  readonly type = FETCH_EMPLOYEE_DEVICES;
  constructor(public payload: number) {}
}

export class SetEmployeeDevices implements Action {
  readonly type = SET_EMPLOYEE_DEVICES;
  constructor(public payload: Device[]) {}
}

export class FetchDayOffRequest implements Action {
  readonly type = FETCH_DAY_OFF_REQUEST;
  constructor(public payload: SearchParams) {}
}
export class SetDayOffRequest implements Action {
  readonly type = SET_DAY_OFF_REQUEST;
  constructor(public payload: PaginatedData<DayOffRequest[]>) {}
}

export class ApproveDayOffRequest implements Action {
  readonly type = APPROVE_REQUEST;
  constructor(public payload: { id: number; searchParams: SearchParams }) {}
}

export class CancelDayOffRequest implements Action {
  readonly type = CANCEL_REQUEST;
  constructor(
    public payload: {
      id: number;
      searchParams: SearchParams;
      employeeId: number;
    }
  ) {}
}

export class DenyDayOffRequest implements Action {
  readonly type = DENY_REQUEST;
  constructor(public payload: { id: number; searchParams: SearchParams }) {}
}

export class DeleteDayOffRequest implements Action {
  readonly type = DELETE_REQUEST;
  constructor(
    public payload: {
      id: number;
      searchParams: SearchParams;
      employeeId: number;
    }
  ) {}
}

export type EmployeesActions =
  | GetEmployeesSuccess
  | SearchEmployees
  | FetchDayOff
  | SetDayOff
  | CreateEmployee
  | UpdateEmployeeStatus
  | DetailEmployee
  | DetailEmployeeSuccess
  | EditEmployee
  | RequestDayOff
  | FetchDayOffRequest
  | SetDayOffRequest
  | FetchEmployeeDeviceHistories
  | SetEmployeeDeviceHistories
  | FetchEmployeeDevices
  | SetEmployeeDevices
  | ApproveDayOffRequest
  | CancelDayOffRequest
  | DenyDayOffRequest
  | DeleteDayOffRequest;
