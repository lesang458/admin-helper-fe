import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';

export interface SearchParams {
  search: string;
  page;
  sort: { sortNameType; sortBirthDateType; sortJoinDateType };
  status: string;
}

export const GET_EMPLOYEES_SUCCESS = '[Employees] Get Employees Success';
export const SEARCH_EMPLOYEES = '[Employees] Search Employees';
export const FETCH_DAY_OFF = '[Employees] Fetch Day Off';
export const SET_DAY_OFF = '[Employees] Set Day Off';
export const CREATE_EMPLOYEE = '[Employees] Create Employee';
export const DETAIL_EMPLOYEE = '[Employees] Detail Employee';
export const DETAIL_EMPLOYEE_SUCCESS = '[Employees] Detail Employee Success';
export const EDIT_EMPLOYEE = '[Employees] Edit Employee';
export const EDIT_EMPLOYEE_SUCCESS = '[Employees] Edit Employee Success';

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
  constructor(public payload: Employee) {}
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
  constructor(public id: number, public payload: Employee) {}
}

export class EditEmployeeSuccess implements Action {
  readonly type = EDIT_EMPLOYEE_SUCCESS;
  constructor(public payload: Employee) {}
}

export type EmployeesActions =
  | GetEmployeesSuccess
  | SearchEmployees
  | FetchDayOff
  | SetDayOff
  | CreateEmployee
  | DetailEmployee
  | DetailEmployeeSuccess
  | EditEmployee
  | EditEmployeeSuccess;
