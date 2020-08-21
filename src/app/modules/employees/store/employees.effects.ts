import { Injectable } from '@angular/core';
import { Employee } from 'src/app/shared/models/employees.model';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as EmployeeActions from './employees.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import * as camelcaseKeys from 'camelcase-keys';

@Injectable()
export class EmployeeEffects {
  @Effect()
  fetchDayOff = this.actions$.pipe(
    ofType(EmployeeActions.FETCH_DAY_OFF),
    switchMap((action: EmployeeActions.FetchDayOff) => {
      const params = new HttpParams()
        .append('search', action.payload.search)
        .append('page', action.payload.page);
      return this.http
        .get<PaginatedData<Employee[]>>(`${environment.APILink}/employees`, {
          observe: 'response',
          params,
        })
        .pipe(
          map((response) => {
            const value: any = camelcaseKeys(response.body, { deep: true });
            const dayOff: PaginatedData<Employee[]> = {
              data: value.data,
              pagination: value.pagination,
            };
            return new EmployeeActions.SetDayOff(dayOff);
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
