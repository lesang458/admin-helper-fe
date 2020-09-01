import { Action } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';

export interface AuthParams {
  email: string;
  password: string;
}

export const LOGIN = '[Auth]] Login';
export const LOGIN_EMAIL = '[Auth]] Login By Email';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: AuthParams) {}
}

export class LoginByEmail implements Action {
  readonly type = LOGIN_EMAIL;
  constructor(public payload: { idToken: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: Employee) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = Login | LoginSuccess | Logout;
