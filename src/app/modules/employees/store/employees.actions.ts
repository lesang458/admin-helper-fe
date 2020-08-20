import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';

export const GET_EMPLOYEES = '[Employees] Get Employees';
export const FETCH_DAY_OFF = '[Employees] Fetch Day Off';
export const SET_DAY_OFF = '[Employees] Set Day Off';

export class GetEmployees implements Action {
  readonly type = GET_EMPLOYEES;
  constructor(public payload: Employee[]) { }
}

export class FetchDayOff implements Action {
  readonly type = FETCH_DAY_OFF;
  constructor(public payload: { search: string, page}) { }
}

export class SetDayOff implements Action {
  readonly type = SET_DAY_OFF;
  constructor(public payload: PaginatedData<Employee[]>) { }
}

export type EmployeesActions =
| GetEmployees
| FetchDayOff
| SetDayOff;
