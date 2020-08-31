import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';

export interface EmployeesParam {
  email: string;
  password: string;
}

export const LOGIN = '[Login] Login';
export const LOGIN_SUCCESS = '[Login] Login Success';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: EmployeesParam) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: Employee) {}
}

export type LoginAction = Login | LoginSuccess;
