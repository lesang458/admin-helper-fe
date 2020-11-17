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
import { NotifyService } from 'src/app/core/services/notify.service';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { Router } from '@angular/router';
import { DayOffRequest } from 'src/app/shared/models/dayoff-request.model';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { Device } from 'src/app/shared/models/device.model';

@Injectable()
export class EmployeeEffects {
  public sortProperties = {
    sortNameType: 'first_name',
    sortBirthDateType: 'birthdate',
    sortJoinDateType: 'join_date',
  };
  @Effect({})
  fetchData = this.actions$.pipe(
    ofType(EmployeesActions.FETCH_DAY_OFF, EmployeesActions.SEARCH_EMPLOYEES),
    switchMap(
      (
        action: EmployeesActions.FetchDayOff | EmployeesActions.SearchEmployees
      ) => {
        let sort = '';
        for (const property of Object.keys(action.payload.sort)) {
          const type = action.payload.sort[property];
          sort = type ? this.sortBy(property, type) : sort;
        }

        let params = new HttpParams()
          .append(ParamsConstant.search, action.payload.search)
          .append(ParamsConstant.page, action.payload.page)
          .append(ParamsConstant.perPage, action.payload.perPage)
          .append(ParamsConstant.sort, sort);

        if (action.payload.status) {
          params = params.append(ParamsConstant.status, action.payload.status);
        }

        if (action.payload.status) {
          params = params.append(
            ParamsConstant.fullInfo,
            action.payload.fullInfo
          );
        }

        return this.http
          .get<PaginatedData<Employee[]>>(`${environment.APILink}/employees`, {
            observe: 'response',
            params,
          })
          .pipe(
            map((response) => {
              const data = camelcaseKeys(response.body, { deep: true });
              data.meta = data.meta
                ? data.meta
                : { totalCount: data.data.length };
              return action.type === EmployeesActions.FETCH_DAY_OFF
                ? new EmployeesActions.SetDayOff(data)
                : new EmployeesActions.GetEmployeesSuccess(data);
            })
          );
      }
    )
  );

  @Effect({ dispatch: false })
  createEmployee = this.actions$.pipe(
    ofType(EmployeesActions.CREATE_EMPLOYEE),
    switchMap((action: EmployeesActions.CreateEmployee) => {
      const body = snakecaseKeys(action.payload, { deep: true });
      return this.http.post<any>(`${environment.APILink}/employees`, body).pipe(
        map(() => {
          this.notify.showSuccess('PROFILE_CREATE.CREATE_SUCCESS');
          this.router.navigateByUrl(`/${RouteConstant.employees}`);
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
            const data: Employee = camelcaseKeys(val.user, { deep: true });
            return new EmployeesActions.DetailEmployeeSuccess(data);
          })
        );
    })
  );

  @Effect({ dispatch: false })
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
            this.notify.showSuccess('PROFILE_CREATE.EDIT_SUCCESS');
            this.router.navigateByUrl(`/${RouteConstant.employees}`);
          })
        );
    })
  );

  @Effect()
  updateEmployeeStatus = this.actions$.pipe(
    ofType(EmployeesActions.UPDATE_EMPLOYEE_STATUS),
    switchMap((action: EmployeesActions.UpdateEmployeeStatus) => {
      return this.http
        .patch(
          `${environment.APILink}/employees/${action.payload.id}/status?status=${action.payload.status}`,
          {}
        )
        .pipe(
          map(() => {
            const key =
              action.payload.status === 'FORMER'
                ? 'MESSAGE.EMPLOYEE_FORMER'
                : 'MESSAGE.EMPLOYEE_ACTIVE';
            this.notify.showSuccess(key);
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
            this.notify.showSuccess('MESSAGE.REQUEST_DAY_OFF');
            return new EmployeesActions.FetchDayOffRequest(
              action.payload.searchParams
            );
          })
        );
    })
  );

  @Effect()
  updateRequestDayOff = this.actions$.pipe(
    ofType(EmployeesActions.UPDATE_REQUEST_DAY_OFF),
    switchMap((action: EmployeesActions.UpdateRequestDayOff) => {
      const body: RequestDayOffModel = {
        ...snakecaseKeys(action.payload.body),
      };
      const id = body.id;
      delete body.id;
      return this.http
        .put(`${environment.APILink}/day_off_request/${id}`, body)
        .pipe(
          map(() => {
            this.notify.showSuccess('MESSAGE.REQUEST_DAY_OFF');
            return new EmployeesActions.FetchDayOffRequest(
              action.payload.searchParams
            );
          })
        );
    })
  );

  @Effect()
  fetchDayOffRequest = this.actions$.pipe(
    ofType(EmployeesActions.FETCH_DAY_OFF_REQUEST),
    switchMap((action: EmployeesActions.FetchDayOffRequest) => {
      let params = new HttpParams();
      if (action.payload.page && action.payload.perPage) {
        params = params
          .append(ParamsConstant.page, action.payload.page)
          .append(ParamsConstant.perPage, action.payload.perPage);
      }
      if (action.payload.dayOffCategoryId) {
        params = params.append(
          ParamsConstant.dayOffCategoryId,
          action.payload.dayOffCategoryId
        );
      }
      if (action.payload.fromDate) {
        params = params.append(
          ParamsConstant.fromDate,
          action.payload.fromDate
        );
      }
      if (action.payload.toDate) {
        params = params.append(ParamsConstant.toDate, action.payload.toDate);
      }
      if (action.payload.userId) {
        params = params.append(ParamsConstant.userId, action.payload.userId);
      }
      return this.http
        .get<PaginatedData<DayOffRequest[]>>(
          `${environment.APILink}/day_off_request`,
          {
            observe: 'response',
            params,
          }
        )
        .pipe(
          map((response) => {
            const data = camelcaseKeys(response.body, { deep: true });
            return new EmployeesActions.SetDayOffRequest(data);
          })
        );
    })
  );

  @Effect()
  fetchDeviceHistories = this.actions$.pipe(
    ofType(EmployeesActions.FETCH_EMPLOYEE_DEVICE_HISTORIES),
    switchMap((action: EmployeesActions.FetchEmployeeDeviceHistories) => {
      const params = new HttpParams().append(ParamsConstant.page, '-1');
      return this.http
        .get<PaginatedData<DeviceHistory[]>>(
          `${environment.APILink}/employees/${action.payload}/device_histories`,
          { params }
        )
        .pipe(
          map((data) => {
            const result = camelcaseKeys(data.data, { deep: true }).reverse();
            return new EmployeesActions.SetEmployeeDeviceHistories(result);
          })
        );
    })
  );

  @Effect()
  fetchDevices = this.actions$.pipe(
    ofType(EmployeesActions.FETCH_EMPLOYEE_DEVICES),
    switchMap((action: EmployeesActions.FetchEmployeeDevices) => {
      const params = new HttpParams().append(ParamsConstant.page, '-1');
      return this.http
        .get<PaginatedData<Device[]>>(
          `${environment.APILink}/employees/${action.payload}/devices`,
          { params }
        )
        .pipe(
          map((data) => {
            const result = camelcaseKeys(data.data, { deep: true });
            return new EmployeesActions.SetEmployeeDevices(result);
          })
        );
    })
  );

  public sortBy(property: string, type: number): string {
    const sortType = type === 1 ? 'asc' : 'desc';
    const sortProp = this.sortProperties[property];
    return `${sortProp}:${sortType}`;
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private notify: NotifyService,
    private router: Router
  ) {}
}
