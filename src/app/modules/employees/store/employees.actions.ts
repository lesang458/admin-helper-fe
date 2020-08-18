import { Action } from '@ngrx/store';
import { Employees } from 'src/app/shared/models/employees.model';

export const GET_EMPLOYEES = '[Employees] Get Employees';

export class GetEmployees implements Action {
  readonly type = GET_EMPLOYEES;
  payload: Employees;
}
