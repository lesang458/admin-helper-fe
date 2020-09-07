import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { RequestDayOffModel } from 'src/app/shared/models/request-day-off.model';

export interface SearchParams {
  search: string;
  page;
  perPage;
  sort: { sortNameType; sortBirthDateType; sortJoinDateType };
  status: string;
}

export interface EmployeesParam {
  id?: number;
  employee?: Employee;
  searchParams?: SearchParams;
}

export const GET_EMPLOYEES_SUCCESS = '[Employees] Get Employees Success';
export const SEARCH_EMPLOYEES = '[Employees] Search Employees';
export const FETCH_DAY_OFF = '[Employees] Fetch Day Off';
export const SET_DAY_OFF = '[Employees] Set Day Off';
export const CREATE_EMPLOYEE = '[Employees] Create Employee';
export const DELETE_EMPLOYEE = '[Employees] Delete Employee';
export const DETAIL_EMPLOYEE = '[Employees] Detail Employee';
export const DETAIL_EMPLOYEE_SUCCESS = '[Employees] Detail Employee Success';
export const EDIT_EMPLOYEE = '[Employees] Edit Employee';
export const REQUEST_DAY_OFF = '[Employees] Request Day Off';

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

export class DeleteEmployee implements Action {
  readonly type = DELETE_EMPLOYEE;
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
    public payload: { body: RequestDayOffModel; searchParams: SearchParams }
  ) {}
}

export type EmployeesActions =
  | GetEmployeesSuccess
  | SearchEmployees
  | FetchDayOff
  | SetDayOff
  | CreateEmployee
  | DeleteEmployee
  | DetailEmployee
  | DetailEmployeeSuccess
  | EditEmployee
  | RequestDayOff;
