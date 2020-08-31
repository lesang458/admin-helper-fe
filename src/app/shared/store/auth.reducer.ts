import * as LoginAction from './auth.actions';
import { Employee } from 'src/app/shared/models/employees.model';

export interface State {
  user: Employee;
}

export const initialState: State = {
  user: null,
};

export function authReducer(
  state: State = initialState,
  action: LoginAction.LoginAction
) {
  switch (action.type) {
    case LoginAction.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LoginAction.LOGOUT:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
