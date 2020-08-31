import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';

export const LOGIN = '[Login] Login';
export const LOGIN_SUCCESS = '[Login] Login Success';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: Employee) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: Employee) {}
}

export type LoginAction = Login;
