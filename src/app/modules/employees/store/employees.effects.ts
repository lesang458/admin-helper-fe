import { Injectable } from '@angular/core';
import { Employee } from 'src/app/shared/models/employees.model';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as EmployeesActions from './employees.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import * as camelcaseKeys from 'camelcase-keys';

@Injectable()
export class EmployeeEffects {
  @Effect({})
  fetchDayOff = this.actions$.pipe(
    ofType(EmployeesActions.FETCH_DAY_OFF),
    switchMap((action: EmployeesActions.FetchDayOff) => {
      let sort = '';
      if (action.payload.sort.sortNameType) {
        const sortNameType =
          action.payload.sort.sortNameType === 1 ? 'asc' : 'desc';
        sort = `first_name:${sortNameType}`;
      }
      if (action.payload.sort.sortBirthDateType) {
        const sortBirthDateType =
          action.payload.sort.sortBirthDateType === 1 ? 'asc' : 'desc';
        sort = `birthdate:${sortBirthDateType}`;
      }

      const params = new HttpParams()
        .append('search', action.payload.search)
        .append('page', action.payload.page)
        .append('sort', sort);

      return this.http
        .get<PaginatedData<Employee[]>>(`${environment.APILink}/employees`, {
          observe: 'response',
          params,
        })
        .pipe(
          map((response) => {
            return new EmployeesActions.SetDayOff(
              camelcaseKeys(response.body, { deep: true })
            );
          })
        );
    })
  );

  @Effect()
  employeeSearch = this.actions$.pipe(
    ofType(EmployeesActions.SEARCH_EMPLOYEES),
    switchMap((action: EmployeesActions.SearchEmployees) => {
      const params: any = action.payload;
      return this.http
        .get<any>(`${environment.APILink}/employees`, {
          params,
        })
        .pipe(
          map((val) => {
            const data: any = camelcaseKeys(val.data);
            return new EmployeesActions.GetEmployeesSuccess(data);
          })
        );
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
