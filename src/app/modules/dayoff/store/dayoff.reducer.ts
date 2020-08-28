import { DayOff } from 'src/app/shared/models/dayoff.model';
import * as DayOffActions from './dayoff.actions';

export interface State {
  dayoff: DayOff[];
}

export const initialState: State = {
  dayoff: [],
};

export function dayoffReducer(
  state: State = initialState,
  action: DayOffActions.DayOffActions
) {
  switch (action.type) {
    case DayOffActions.GET_DAYOFF_SUCCESS:
      return {
        ...state,
        dayoff: [...action.payload],
      };
    default:
      return state;
  }
}
