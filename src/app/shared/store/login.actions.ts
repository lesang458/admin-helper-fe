import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';

export const LOGIN = '[Login] Login';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: Employee) {}
}

export type LoginAction = Login;
