import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';

export interface EmployeesParam {
  email: string;
  password: string;
}

export const LOGIN = '[Auth]] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: EmployeesParam) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: Employee) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload = null) {}
}

export type LoginAction = Login | LoginSuccess | Logout;
