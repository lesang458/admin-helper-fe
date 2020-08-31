import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as DayOffActions from './dayoff.actions';
import { switchMap, map } from 'rxjs/operators';
import { DayOff } from 'src/app/shared/models/dayoff.model';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import * as snakecaseKeys from 'snakecase-keys';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { FetchDayOff } from '../../employees/store/employees.actions';

@Injectable()
export class DayOffEffects {
  @Effect()
  fetchData = this.actions$.pipe(
    ofType(DayOffActions.FETCH_DAY_OFF),
    switchMap(() => {
      return this.http
        .get<any>(`${environment.APILink}/day-off-categories`)
        .pipe(
          map((data) => {
            const dayOffCategories = data.day_off_categories.map((i) => {
              if (!i.description) {
                i.description = '';
              }
              return i;
            });
            return new DayOffActions.GetDayOffSuccess(dayOffCategories);
          })
        );
    })
  );

  @Effect()
  createDayoff = this.actions$.pipe(
    ofType(DayOffActions.CREATE_DAY_OFF),
    switchMap((action: DayOffActions.CreateDayOff) => {
      const body: DayOff = snakecaseKeys(action.payload);
      // return this.http.post<any>(`${environment.APILink}/employees`, body).pipe(
      //   map((val) => {
      //     const data: DayOff = camelcaseKeys(val.data);
      //     return new DayOffActions.CreateDayOff(data);
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
          this.store.select('dayoff').source.source.source.subscribe((data) => {
            dayoff = data.dayoff.dayoff;
          });
          return new DayOffActions.GetDayOffSuccess([
            ...dayoff,
            { ...val.data, id: dayoff.length },
          ]);
        })
      );
    })
  );

  @Effect()
  updateDayoff = this.actions$.pipe(
    ofType(DayOffActions.UPDATE_DAY_OFF),
    switchMap((action: DayOffActions.UpdateDayOff) => {
      const body: DayOff = snakecaseKeys(action.payload);
      return of({
        data: {
          id: body.id,
          name: body.name,
          description: body.description,
        },
      }).pipe(
        map((val) => {
          let dayoff;
          this.store.select('dayoff').source.source.source.subscribe((data) => {
            dayoff = data.dayoff.dayoff;
          });

          return new DayOffActions.GetDayOffSuccess([
            ...dayoff.map((item) => {
              if (item.id === val.data.id) {
                item = val.data;
              }
              return item;
            }),
          ]);
        })
      );
    })
  );

  @Effect()
  deleteDayoff = this.actions$.pipe(
    ofType(DayOffActions.UPDATE_DAY_OFF),
    switchMap((action: DayOffActions.DeleteDayOff) => {
      const id: string = action.payload;
      return of({}).pipe(
        map(() => {
          let dayoff;
          this.store.select('dayoff').source.source.source.subscribe((data) => {
            dayoff = data.dayoff.dayoff;
          });

          return new DayOffActions.GetDayOffSuccess([
            ...dayoff.filter((item) => {
              if (item.id !== id) {
                return item;
              }
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
