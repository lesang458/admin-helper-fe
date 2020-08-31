import * as AuthActions from './auth.actions';
import { Employee } from 'src/app/shared/models/employees.model';

export interface State {
  user: Employee;
}

export const initialState: State = {
  user: null,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
