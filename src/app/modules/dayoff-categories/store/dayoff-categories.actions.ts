import { Action } from '@ngrx/store';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';

export const GET_DAYOFF_CATEGORIES_SUCCESS = '[Dayoff Categories] Get Day off categories Success';
export const CREATE_DAY_OFF_CATEGORY = '[Dayoff Categories] Create Day off Category';
export const UPDATE_DAY_OFF_CATEGORY = '[Dayoff Categories] Update Day off Category';
export const DELETE_DAY_OFF_CATEGORY = '[Dayoff Categories] Delete Day off Category';
export const FETCH_DAY_OFF_CATEGORIES = '[Dayoff Categories] Fetch Day Off Categories';

export class GetDayOffCategoriesSuccess implements Action {
  readonly type = GET_DAYOFF_CATEGORIES_SUCCESS;
  constructor(public payload: DayOffCategory[]) {}
}
export class CreateDayOffCategory implements Action {
  readonly type = CREATE_DAY_OFF_CATEGORY;
  constructor(public payload: DayOffCategory) {}
}
export class UpdateDayOffCategory implements Action {
  readonly type = UPDATE_DAY_OFF_CATEGORY;
  constructor(public payload: DayOffCategory) {}
}
export class DeleteDayOffCategory implements Action {
  readonly type = DELETE_DAY_OFF_CATEGORY;
  constructor(public payload: number) {}
}
export class FetchDayOffCategories implements Action {
  readonly type = FETCH_DAY_OFF_CATEGORIES;
}
export type DayOffCategoriesActions =
  | GetDayOffCategoriesSuccess
  | FetchDayOffCategories
  | CreateDayOffCategory
  | UpdateDayOffCategory
  | DeleteDayOffCategory;
