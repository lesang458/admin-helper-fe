import * as LoginAction from './login.actions';
import { Employee } from 'src/app/shared/models/employees.model';

export interface EmployeesParam {
  email: string;
  password: string;
}
export interface State {
  login: EmployeesParam;
  loginSuccess: Employee;
}

export const initialState: State = {
  login: null,
  loginSuccess: null,
};

export function loginReducer(
  state: State = initialState,
  action: LoginAction.LoginAction
) {
  switch (action.type) {
    case LoginAction.LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case LoginAction.LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: action.payload,
      };

    default:
      return state;
  }
}
