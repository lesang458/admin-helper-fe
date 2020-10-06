import * as DayOffActions from '../store/dayoff-categories.actions';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';

export interface State {
  dayoff: DayOffCategory[];
}

export const initialState: State = {
  dayoff: [],
};

export function dayoffCategoriesReducer(
  state: State = initialState,
  action: DayOffActions.DayOffCategoriesActions
) {
  switch (action.type) {
    case DayOffActions.SET_CATEGORIES:
      return {
        ...state,
        dayoff: [...action.payload],
      };
    default:
      return state;
  }
}
