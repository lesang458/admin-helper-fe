import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/shared/models/employees.model';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as EmployeeActions from './employees.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { CamelCaseHelper } from 'src/app/core/helper/camelCase.helper';

@Injectable()
export class EmployeeEffects {
  @Effect({ dispatch: false })
  employeeGetAll = this.actions$.pipe(
    ofType(EmployeeActions.GET_EMPLOYEES),
    switchMap(() => {
      return this.http
        .get<Employee>(environment.APILink, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .pipe(
          map((val) => {
            let value: any = CamelCaseHelper.keysToCamel(val);
            return value
              ? this.store.dispatch(
                  new EmployeeActions.GetEmployeesSuccess(value.data)
                )
              : false;
          })
        );
    })
  );
  @Effect({ dispatch: false })
  employeeSearch = this.actions$.pipe(
    ofType(EmployeeActions.SEARCH_EMPLOYEES),
    switchMap((params: EmployeeActions.SearchEmployees) => {
      let params1 = new HttpParams().append('search', 'ree');
      console.log(params1);
      console.log(params);

      return this.http
        .get<any>(`${environment.APILink}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          params: params1,
        })
        .pipe(
          map((val) => {
            let value: any = CamelCaseHelper.keysToCamel(val);
            return value
              ? this.store.dispatch(
                  new EmployeeActions.GetEmployeesSuccess(value.data)
                )
              : false;
          })
        );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store
  ) {}
}
