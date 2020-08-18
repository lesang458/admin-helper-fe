import { Action } from '@ngrx/store';
import { Employees } from 'src/app/shared/models/employees.model';

export const LIST_EMPLOYEES = 'LIST_EMPLOYEES';

export class EmployeesList implements Action {
  readonly type = LIST_EMPLOYEES;
  payload: Employees;
}
