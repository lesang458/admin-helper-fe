import * as LoginAction from './login.actions';
import { Employee } from 'src/app/shared/models/employees.model';

export interface State {
  login: Employee;
}

export const initialState: State = {
  login: null,
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

    default:
      return state;
  }
}
