import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as EmployeeActions from './employees.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import * as camelcaseKeys from 'camelcase-keys';
import * as snakecaseKeys from 'snakecase-keys';

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
            let data: any = camelcaseKeys(val.data);
            return new EmployeeActions.GetEmployeesSuccess(data);
          })
        );
    })
  );

  @Effect()
  createEmployee = this.actions$.pipe(
    ofType(EmployeeActions.CREATE_EMPLOYEE),
    switchMap((action: EmployeeActions.CreateEmployee) => {
      let body: any = snakecaseKeys(action.payload);
      return this.http
        .post<any>(`${environment.APILink}employees`, body, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .pipe(
          map((val) => {
            let data: any = camelcaseKeys(val.data);
            return new EmployeeActions.CreateEmployee(data);
          })
        );
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
