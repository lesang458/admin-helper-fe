import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as DayOffCategoriesActions from './dayoff-categories.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import * as camelcaseKeys from 'camelcase-keys';
import { NotifyService } from 'src/app/core/services/notify.service';
import * as snakecaseKeys from 'snakecase-keys';

@Injectable()
export class DayOffCategoriesEffects {
  @Effect()
  fetchData = this.actions$.pipe(
    ofType(DayOffCategoriesActions.FETCH_DAY_OFF_CATEGORIES),
    switchMap(() => {
      return this.http
        .get<any>(`${environment.APILink}/day_off_categories`)
        .pipe(
          map((data) => {
            const dayOffCategories = camelcaseKeys(data.day_off_categories).map(
              (i) => {
                return {
                  ...i,
                  description: i.description ? i.description : '',
                };
              }
            );
            return new DayOffCategoriesActions.GetDayOffCategoriesSuccess(
              dayOffCategories
            );
          })
        );
    })
  );

  @Effect()
  createDayoffCategory = this.actions$.pipe(
    ofType(DayOffCategoriesActions.CREATE_DAY_OFF_CATEGORY),
    switchMap((action: DayOffCategoriesActions.CreateDayOffCategory) => {
      const body: DayOffCategory = snakecaseKeys(action.payload);
      return this.http
        .post(`${environment.APILink}/day_off_categories`, body)
        .pipe(
          map(() => {
            this.notify.showSuccess('PROFILE_CREATE.CREATE_SUCCESS');
            return new DayOffCategoriesActions.FetchDayOffCategories();
          })
        );
    })
  );

  @Effect()
  updateDayoffCategory = this.actions$.pipe(
    ofType(DayOffCategoriesActions.UPDATE_DAY_OFF_CATEGORY),
    switchMap((action: DayOffCategoriesActions.UpdateDayOffCategory) => {
      const body: DayOffCategory = snakecaseKeys(action.payload);
      return this.http
        .put(`${environment.APILink}/day_off_categories/${body.id}`, body)
        .pipe(
          map(() => {
            this.notify.showSuccess('PROFILE_CREATE.EDIT_SUCCESS');
            return new DayOffCategoriesActions.FetchDayOffCategories();
          })
        );
    })
  );

  @Effect()
  deleteDayoffCategory = this.actions$.pipe(
    ofType(DayOffCategoriesActions.DELETE_DAY_OFF_CATEGORY),
    switchMap((action: DayOffCategoriesActions.DeleteDayOffCategory) => {
      const id = action.payload;
      return of({ id }).pipe(
        map(() => {
          this.notify.showSuccess('MESSAGE.DELETE_SUCCESS');
          let dayoff;
          this.store.select('dayoffCategories').subscribe((data) => {
            dayoff = data.dayoff;
          });

          return new DayOffCategoriesActions.GetDayOffCategoriesSuccess([
            ...dayoff.filter((item) => {
              return item.id !== id;
            }),
          ]);
        })
      );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private notify: NotifyService
  ) {}
}
