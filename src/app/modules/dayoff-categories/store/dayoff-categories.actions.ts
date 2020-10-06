import { Action } from '@ngrx/store';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';

export const SET_CATEGORIES = '[Day Off Categories] Set Categories';
export const CREATE_CATEGORY = '[Day Off Categories] Create Category';
export const UPDATE_CATEGORY = '[Day Off Categories] Update Category';
export const FETCH_CATEGORIES = '[Day Off Categories] Fetch Categories';
export const DEACTIVATE_CATEGORY = '[Day Off Categories] Deactivate Category';

export class SetDayOffCategories implements Action {
  readonly type = SET_CATEGORIES;
  constructor(public payload: DayOffCategory[]) {}
}
export class CreateDayOffCategory implements Action {
  readonly type = CREATE_CATEGORY;
  constructor(public payload: DayOffCategory) {}
}
export class UpdateDayOffCategory implements Action {
  readonly type = UPDATE_CATEGORY;
  constructor(public payload: DayOffCategory) {}
}
export class FetchDayOffCategories implements Action {
  readonly type = FETCH_CATEGORIES;
  constructor(public payload: { status: string }) {}
}
export class DeactivateDayOffCategory implements Action {
  readonly type = DEACTIVATE_CATEGORY;
  constructor(public payload: { status: string }) {}
}

export type DayOffCategoriesActions =
  | SetDayOffCategories
  | FetchDayOffCategories
  | CreateDayOffCategory
  | UpdateDayOffCategory;
