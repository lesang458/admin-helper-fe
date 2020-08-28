import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as DayOffActions from './dayoff.actions';
import { switchMap, map } from 'rxjs/operators';
import { DayOff } from 'src/app/shared/models/dayoff.model';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

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
  constructor(private actions$: Actions, private http: HttpClient) {}
}
