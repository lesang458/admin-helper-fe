import { HttpParams } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';

export const GET_EMPLOYEES = '[Employees] Get Employees';
export const GET_EMPLOYEES_SUCCESS = '[Employees] Get Employees Success';
export const SEARCH_EMPLOYEES = '[Employees] Search Employees';
export const FETCH_DAY_OFF = '[Employees] Fetch Day Off';
export const SET_DAY_OFF = '[Employees] Set Day Off';

export class GetEmployees implements Action {
  readonly type = GET_EMPLOYEES;
}

export class GetEmployeesSuccess implements Action {
  readonly type = GET_EMPLOYEES_SUCCESS;
  constructor(public payload: Employee[]) { }
}

export class SearchEmployees implements Action {
  readonly type = SEARCH_EMPLOYEES;
  constructor(public payload: HttpParams) { }
}
export class FetchDayOff implements Action {
  readonly type = FETCH_DAY_OFF;
  constructor(public payload: { search: string; page; sortType }) { }
}

export class SetDayOff implements Action {
  readonly type = SET_DAY_OFF;
  constructor(public payload: PaginatedData<Employee[]>) { }
}

export type EmployeesActions = GetEmployees | FetchDayOff | SetDayOff | GetEmployeesSuccess | SearchEmployees;
