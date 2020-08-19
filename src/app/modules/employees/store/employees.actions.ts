import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';
import { HttpParams } from '@angular/common/http';

export const GET_EMPLOYEES = '[Employees] Get Employees';

export class GetEmployees implements Action {
  readonly type = GET_EMPLOYEES;
}

export const GET_EMPLOYEES_SUCCESS = '[Employees] Get Employees Success';

export class GetEmployeesSuccess implements Action {
  readonly type = GET_EMPLOYEES_SUCCESS;
  constructor(public payload: Employee[]) {}
}

export const SEARCH_EMPLOYEES = '[Employees] Search Employees';

export class SearchEmployees implements Action {
  readonly type = SEARCH_EMPLOYEES;
  constructor(public payload: HttpParams) {}
}
