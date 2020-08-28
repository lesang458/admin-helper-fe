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
            return new DayOffActions.GetDayOffSuccess(data.day_off_categories);
          })
        );
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
