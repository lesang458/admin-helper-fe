import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as DayOffCategoriesActions from './dayoff-categories.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import * as snakecaseKeys from 'snakecase-keys';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import * as camelcaseKeys from 'camelcase-keys';

@Injectable()
export class DayOffCategoriesEffects {
  @Effect()
  fetchData = this.actions$.pipe(
    ofType(DayOffCategoriesActions.FETCH_DAY_OFF_CATEGORIES),
    switchMap(() => {
      return this.http
        .get<any>(`${environment.APILink}/day-off-categories`)
        .pipe(
          map((data) => {
            const dayOffCategories = camelcaseKeys(data.day_off_categories).map(
              (i) => {
                if (!i.description) {
                  i.description = '';
                }
                if (!i.totalHoursDefault) {
                  i.totalHoursDefault = 160;
                }
                return i;
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
      // return this.http.post<any>(`${environment.APILink}/employees`, body).pipe(
      //   map((val) => {
      //     const data: DayOff = camelcaseKeys(val.data);
      //     return new DayOffCategoriesActions .CreateDayOff(data);
      //   })
      // );
      return of({
        data: {
          name: body.name,
          description: body.description,
        },
      }).pipe(
        map((val) => {
          let dayoff;
          this.store
            .select('dayoffCategories')
            .source.source.source.subscribe((data) => {
              dayoff = data.dayoffCategories.dayoff;
            });
          return new DayOffCategoriesActions.GetDayOffCategoriesSuccess([
            ...dayoff,
            { ...val.data, id: (dayoff.length + 1).toString() },
          ]);
        })
      );
    })
  );

  @Effect()
  updateDayoffCategory = this.actions$.pipe(
    ofType(DayOffCategoriesActions.UPDATE_DAY_OFF_CATEGORY),
    switchMap((action: DayOffCategoriesActions.UpdateDayOffCategory) => {
      const body: DayOffCategory = snakecaseKeys(action.payload);
      return of({
        data: {
          id: body.id,
          name: body.name,
          description: body.description,
        },
      }).pipe(
        map((val) => {
          let dayoff;
          this.store
            .select('dayoffCategories')
            .source.source.source.subscribe((data) => {
              dayoff = data.dayoffCategories.dayoff;
            });
          const array = dayoff.map((item) => {
            if (item.id == val.data.id) {
              item = val.data;
            }
            return item;
          });
          return new DayOffCategoriesActions.GetDayOffCategoriesSuccess(array);
        })
      );
    })
  );

  @Effect()
  deleteDayoffCategory = this.actions$.pipe(
    ofType(DayOffCategoriesActions.DELETE_DAY_OFF_CATEGORY),
    switchMap((action: DayOffCategoriesActions.DeleteDayOffCategory) => {
      const id: string = action.payload;
      return of({ id }).pipe(
        map(() => {
          let dayoff;
          this.store
            .select('dayoffCategories')
            .source.source.source.subscribe((data) => {
              dayoff = data.dayoffCategories.dayoff;
            });

          return new DayOffCategoriesActions.GetDayOffCategoriesSuccess([
            ...dayoff.filter((item) => {
              return item.id != id;
            }),
          ]);
        })
      );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
