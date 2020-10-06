import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as DayOffCategoriesActions from './dayoff-categories.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import * as camelcaseKeys from 'camelcase-keys';
import { NotifyService } from 'src/app/core/services/notify.service';
import * as snakecaseKeys from 'snakecase-keys';

@Injectable()
export class DayOffCategoriesEffects {
  @Effect()
  fetchData = this.actions$.pipe(
    ofType(DayOffCategoriesActions.FETCH_CATEGORIES),
    switchMap((action: DayOffCategoriesActions.FetchDayOffCategories) => {
      const params = new HttpParams().append('status', action.payload.status);
      return this.http
        .get<any>(`${environment.APILink}/day_off_categories`, { params })
        .pipe(
          map((data) => {
            const dayOffCategories = camelcaseKeys(data.data).map((i) => {
              return {
                ...i,
                description: i.description ? i.description : '',
              };
            });
            return new DayOffCategoriesActions.SetDayOffCategories(
              dayOffCategories
            );
          })
        );
    })
  );

  @Effect()
  createDayoffCategory = this.actions$.pipe(
    ofType(DayOffCategoriesActions.CREATE_CATEGORY),
    switchMap((action: DayOffCategoriesActions.CreateDayOffCategory) => {
      const body: DayOffCategory = snakecaseKeys(action.payload);
      return this.http
        .post(`${environment.APILink}/day_off_categories`, body)
        .pipe(
          map(() => {
            this.notify.showSuccess('PROFILE_CREATE.CREATE_SUCCESS');
            const param = { status: '' };
            return new DayOffCategoriesActions.FetchDayOffCategories(param);
          })
        );
    })
  );

  @Effect()
  updateDayoffCategory = this.actions$.pipe(
    ofType(DayOffCategoriesActions.UPDATE_CATEGORY),
    switchMap((action: DayOffCategoriesActions.UpdateDayOffCategory) => {
      const body: DayOffCategory = snakecaseKeys(action.payload);
      return this.http
        .put(`${environment.APILink}/day_off_categories/${body.id}`, body)
        .pipe(
          map(() => {
            this.notify.showSuccess('PROFILE_CREATE.EDIT_SUCCESS');
            const param = { status: '' };
            return new DayOffCategoriesActions.FetchDayOffCategories(param);
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private notify: NotifyService
  ) {}
}
