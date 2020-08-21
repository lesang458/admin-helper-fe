import { HttpParams } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';

export const GET_EMPLOYEES = '[Employees] Get Employees';
export const GET_EMPLOYEES_SUCCESS = '[Employees] Get Employees Success';
export const SEARCH_EMPLOYEES = '[Employees] Search Employees';

export class GetEmployees implements Action {
  readonly type = GET_EMPLOYEES;
}

export class GetEmployeesSuccess implements Action {
  readonly type = GET_EMPLOYEES_SUCCESS;
  constructor(public payload: Employee[]) {}
}

export class SearchEmployees implements Action {
  readonly type = SEARCH_EMPLOYEES;
  constructor(public payload: HttpParams) {}
}

export type EmployeesActions = GetEmployeesSuccess | SearchEmployees;
