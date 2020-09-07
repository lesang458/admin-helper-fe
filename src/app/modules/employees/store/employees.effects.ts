import { Injectable } from '@angular/core';
import { Employee } from 'src/app/shared/models/employees.model';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as EmployeesActions from './employees.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import * as camelcaseKeys from 'camelcase-keys';
import * as snakecaseKeys from 'snakecase-keys';
import { RequestDayOffModel } from 'src/app/shared/models/request-day-off.model';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';

@Injectable()
export class EmployeeEffects {
  @Effect({})
  fetchData = this.actions$.pipe(
    ofType(EmployeesActions.FETCH_DAY_OFF, EmployeesActions.SEARCH_EMPLOYEES),
    switchMap(
      (
        action: EmployeesActions.FetchDayOff | EmployeesActions.SearchEmployees
      ) => {
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

        if (action.payload.sort.sortJoinDateType) {
          const sortJoinDateType =
            action.payload.sort.sortJoinDateType === 1 ? 'asc' : 'desc';
          sort = `join_date:${sortJoinDateType}`;
        }

        let params = new HttpParams()
          .append(ParamsConstant.search, action.payload.search)
          .append(ParamsConstant.page, action.payload.page)
          .append(ParamsConstant.perPage, action.payload.perPage)
          .append(ParamsConstant.sort, sort);

        if (action.payload.status) {
          params = params.append(ParamsConstant.status, action.payload.status);
        }

        return this.http
          .get<PaginatedData<Employee[]>>(`${environment.APILink}/employees`, {
            observe: 'response',
            params,
          })
          .pipe(
            map((response) => {
              const data = camelcaseKeys(response.body, { deep: true });
              return action.type === EmployeesActions.FETCH_DAY_OFF
                ? new EmployeesActions.SetDayOff(data)
                : new EmployeesActions.GetEmployeesSuccess(data);
            })
          );
      }
    )
  );

  @Effect()
  createEmployee = this.actions$.pipe(
    ofType(EmployeesActions.CREATE_EMPLOYEE),
    switchMap((action: EmployeesActions.CreateEmployee) => {
      const body = snakecaseKeys(action.payload);
      return this.http.post<any>(`${environment.APILink}/employees`, body).pipe(
        map((val) => {
          const data: Employee = camelcaseKeys(val.data);
          return new EmployeesActions.CreateEmployee(data);
        })
      );
    })
  );

  @Effect()
  detailEmployee = this.actions$.pipe(
    ofType(EmployeesActions.DETAIL_EMPLOYEE),
    switchMap((action: EmployeesActions.DetailEmployee) => {
      return this.http
        .get<any>(`${environment.APILink}/employees/${action.payload}`)
        .pipe(
          map((val) => {
            const data: Employee = camelcaseKeys(val.user);
            return new EmployeesActions.DetailEmployeeSuccess(data);
          })
        );
    })
  );

  @Effect()
  editEmployee = this.actions$.pipe(
    ofType(EmployeesActions.EDIT_EMPLOYEE),
    switchMap((action: EmployeesActions.EditEmployee) => {
      return this.http
        .put<any>(
          `${environment.APILink}/employees/${action.payload.id}`,
          snakecaseKeys(action.payload.employee)
        )
        .pipe(
          map(() => {
            return new EmployeesActions.SearchEmployees(
              action.payload.searchParams
            );
          })
        );
    })
  );

  @Effect()
  deleteEmployee = this.actions$.pipe(
    ofType(EmployeesActions.CHANGE_STATUS_EMPLOYEE),
    switchMap((action: EmployeesActions.ChangeStatusEmployee) => {
      return this.http
        .patch(
          `${environment.APILink}/employees/${action.payload.id}/status?status=${action.payload.status}`,
          {}
        )
        .pipe(
          map(() => {
            return new EmployeesActions.SearchEmployees(
              action.payload.searchParams
            );
          })
        );
    })
  );

  @Effect()
  requestDayOff = this.actions$.pipe(
    ofType(EmployeesActions.REQUEST_DAY_OFF),
    switchMap((action: EmployeesActions.RequestDayOff) => {
      const body: RequestDayOffModel = {
        ...snakecaseKeys(action.payload.body),
      };
      const id = body.id;
      delete body.id;
      return this.http
        .post<any>(
          `${environment.APILink}/employees/${id}/day-off-requests`,
          body
        )
        .pipe(
          map(() => {
            return new EmployeesActions.FetchDayOff(
              action.payload.searchParams
            );
          })
        );
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
