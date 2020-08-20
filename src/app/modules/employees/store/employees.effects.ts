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
            let value: any = CamelCaseHelper.keysToCamel(val);
            return new EmployeeActions.GetEmployeesSuccess(value.data);
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
