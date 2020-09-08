import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as DevicesHistoryActions from './devices-history.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as camelcaseKeys from 'camelcase-keys';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';

@Injectable()
export class DeviceHistoryEffects {
  @Effect()
  getDevicesHistory = this.actions$.pipe(
    ofType(DevicesHistoryActions.FETCH_DEVICE_HISTORY),
    switchMap((action: DevicesHistoryActions.FetchDeviceHistory) => {
      let params = new HttpParams()
        .append(ParamsConstant.page, action.payload.page)
        .append(ParamsConstant.perPage, action.payload.perPage)

      if (action.payload.status) {
        params = params.append(ParamsConstant.status, action.payload.status);
      }
      if (action.payload.deviceCategoryId) {
        params = params.append(
          ParamsConstant.deviceCategoryId,
          action.payload.deviceCategoryId
        );
      }
      if (action.payload.historyTo) {
        params = params.append(
          ParamsConstant.historyTo,
          action.payload.historyTo
        );
      }
      if (action.payload.historyFrom) {
        params = params.append(
          ParamsConstant.historyFrom,
          action.payload.historyFrom
        );
      }
      return this.http
        .get<PaginatedData<DeviceHistory[]>>(
          `${environment.APILink}/device_histories`,
          {
            observe: 'response', 
            params
          }
        )
        .pipe(
          map((response) => {
            const data = camelcaseKeys(response.body, { deep: true });
            return new DevicesHistoryActions.GetDeviceHistorySuccess(data);
          })
        );
    })
  );

  @Effect()
  detailDeviceHistory = this.actions$.pipe(
    ofType(DevicesHistoryActions.DETAIL_DEVICE_HISTORY),
    switchMap((action: DevicesHistoryActions.DetailDeviceHistory) => {
      return this.http
        .get<any>(`${environment.APILink}/device_histories/${action.payload}`)
        .pipe(
          map((val) => {
            const data: DeviceHistory = camelcaseKeys(val.device_history);
            return new DevicesHistoryActions.DetailDeviceHistorySuccess(data);
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
