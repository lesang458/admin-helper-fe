import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as DevicesActions from './devices.actions';
import { environment } from 'src/environments/environment.prod';
import * as camelcaseKeys from 'camelcase-keys';
import * as snakecaseKeys from 'snakecase-keys';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { Device } from 'src/app/shared/models/device.model';
import { switchMap, map } from 'rxjs/operators';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';
import { ParamsConstant } from 'src/app/shared/constants/params.constant';
@Injectable()
export class DeviceEffects {
  @Effect()
  fetchDevice = this.actions$.pipe(
    ofType(DevicesActions.FETCH_DEVICES),
    switchMap((action: DevicesActions.FetchDevices) => {
      let params = new HttpParams()
        .append(ParamsConstant.page, action.payload.page)
        .append(ParamsConstant.perPage, action.payload.perPage);
      if (action.payload.status) {
        params = params.append(ParamsConstant.status, action.payload.status);
      }
      if (action.payload.deviceCategoryId) {
        params = params.append(
          ParamsConstant.deviceCategoryId,
          action.payload.deviceCategoryId
        );
      }
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
        .get<PaginatedData<DeviceCategory[]>>(
          `${environment.APILink}/device_categories`,
          {
            observe: 'response',
          }
        )
        .pipe(
          map((response) => {
            const data = camelcaseKeys(response.body, { deep: true });
            return new DevicesActions.SetDeviceCategories(data.data);
          })
        );
    })
  );

  @Effect()
  assignDevice = this.actions$.pipe(
    ofType(DevicesActions.ASSIGNED_DEVICE),
    switchMap((action: DevicesActions.AssignDevice) => {
      return this.http
        .put<any>(
          `${environment.APILink}/devices/${action.payload.id}/assign`,
          snakecaseKeys(action.payload.userId)
        )
        .pipe(
          map(() => {
            return new DevicesActions.FetchDevices(action.payload.params);
          })
        );
    })
  );

  @Effect()
  createDevice = this.actions$.pipe(
    ofType(DevicesActions.CREATE_DEVICE),
    switchMap((action: DevicesActions.CreateDevice) => {
      return this.http
        .post<Device>(
          `${environment.APILink}/devices`,
          snakecaseKeys(action.payload.device)
        )
        .pipe(
          map(() => {
            return new DevicesActions.FetchDevices(action.payload.params);
          })
        );
    })
  );

  @Effect()
  editDevice = this.actions$.pipe(
    ofType(DevicesActions.EDIT_DEVICE),
    switchMap((action: DevicesActions.EditDevice) => {
      return this.http
        .put<Device>(
          `${environment.APILink}/devices/${action.payload.id}`,
          snakecaseKeys(action.payload.device)
        )
        .pipe(
          map(() => {
            return new DevicesActions.FetchDevices(action.payload.params);
          })
        );
    })
  );

  @Effect()
  deleteDevice = this.actions$.pipe(
    ofType(DevicesActions.DELETE_DEVICE),
    switchMap((action: DevicesActions.DeleteDevice) => {
      return this.http
        .delete<void>(`${environment.APILink}/devices/${action.payload.id}`)
        .pipe(
          map(() => {
            return new DevicesActions.FetchDevices(action.payload.params);
          })
        );
    })
  );

  @Effect()
  discardDevice = this.actions$.pipe(
    ofType(DevicesActions.DISCARD_DEVICE),
    switchMap((action: DevicesActions.DiscardDevice) => {
      return this.http
        .put<void>(`${environment.APILink}/devices/${action.payload.id}/discard`, {})
        .pipe(
          map(() => {
            return new DevicesActions.FetchDevices(action.payload.params);
          })
        );
    })
  );

  @Effect()
  inventoryDevice = this.actions$.pipe(
    ofType(DevicesActions.MOVE_DEVICE_TO_INVENTORY),
    switchMap((action: DevicesActions.MoveDeviceToInventory) => {
      return this.http
        .put<void>(
          `${environment.APILink}/devices/${action.payload.id}/move_to_inventory`,
          {}
        )
        .pipe(
          map(() => {
            return new DevicesActions.FetchDevices(action.payload.params);
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
