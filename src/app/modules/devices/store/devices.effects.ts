import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as DevicesActions from './devices.actions';
import { environment } from 'src/environments/environment.prod';
import * as camelcaseKeys from 'camelcase-keys';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { Device } from 'src/app/shared/models/device.model';
import { switchMap, map } from 'rxjs/operators';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';

@Injectable()
export class DeviceEffects {
  @Effect()
  fetchDevice = this.actions$.pipe(
    ofType(DevicesActions.FETCH_DEVICES),
    switchMap((action: DevicesActions.FetchDevices) => {
      const params = new HttpParams()
        .append('page', action.payload.page)
        .append('per_page', action.payload.perPage);
      return this.http
        .get<PaginatedData<Device[]>>(`${environment.APILink}/devices`, {
          observe: 'response',
          params,
        })
        .pipe(
          map((response) => {
            const data = camelcaseKeys(response.body, { deep: true });
            return new DevicesActions.SetDevices(data);
          })
        );
    })
  );

  @Effect()
  fetchCategories = this.actions$.pipe(
    ofType(DevicesActions.FETCH_DEVICE_CATEGORIES),
    switchMap((action: DevicesActions.FetchDeviceCategories) => {
      return this.http
        .get<DeviceCategory[]>(`${environment.APILink}/device_category`, {
          observe: 'response',
        })
        .pipe(
          map((response) => {
            return new DevicesActions.SetDeviceCategories(
              camelcaseKeys(response.body)
            );
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
