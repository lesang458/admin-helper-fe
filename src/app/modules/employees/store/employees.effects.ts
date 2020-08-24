import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as EmployeeActions from './employees.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import * as camelcaseKeys from 'camelcase-keys';

@Injectable()
export class EmployeeEffects {
  @Effect()
  employeeSearch = this.actions$.pipe(
    ofType(EmployeeActions.SEARCH_EMPLOYEES),
    switchMap((action: EmployeeActions.SearchEmployees) => {
      let params: any = action.payload;
      return this.http
        .get<any>(`${environment.APILink}employees`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          params,
        })
        .pipe(
          map((val) => {
            let value: any = {
              data: camelcaseKeys(val.data),
              pagination: camelcaseKeys(val.pagination),
            };
            return new EmployeeActions.GetEmployeesSuccess(value);
          })
        );
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
