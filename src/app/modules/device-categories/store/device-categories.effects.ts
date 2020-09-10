import * as DeviceCategoriesActions from './device-categories.actions';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as camelcaseKeys from 'camelcase-keys';
import { environment } from 'src/environments/environment';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';

@Injectable()
export class DeviceCategoriesEffects {
  @Effect()
  fetchData = this.actions$.pipe(
    ofType(DeviceCategoriesActions.FETCH_DEVICE_CATEGORIES),
    switchMap(() => {
      return this.http
        .get<any>(`${environment.APILink}/device_categories`)
        .pipe(
          map((data) => {
            const deviceCategories = camelcaseKeys(data.data).map(
              (i) => {
                if (!i.description) {
                  i.description = '';
                }
                return i;
              }
            );
            return new DeviceCategoriesActions.GetDeviceCategoriesSuccess(
              deviceCategories
            );
          })
        );
    })
  );

  @Effect()
  createDeviceCategory = this.actions$.pipe(
    ofType(DeviceCategoriesActions.CREATE_DEVICE_CATEGORY),
    switchMap((action: DeviceCategoriesActions.CreateDeviceCategory) => {
      return this.http.post<any>(`${environment.APILink}/device_categories`, action.payload).pipe(
        map(() => {
          return new DeviceCategoriesActions.FetchDeviceCategories();
        })
      );
    })
  );

  @Effect()
  updateDeviceCategory = this.actions$.pipe(
    ofType(DeviceCategoriesActions.UPDATE_DEVICE_CATEGORY),
    switchMap((action: DeviceCategoriesActions.UpdateDeviceCategory) => {
      return this.http
        .put<DeviceCategory>(
          `${environment.APILink}/device_categories/${action.payload.id}`,
          action.payload.deviceCategory
        )
        .pipe(
          map(() => {
            return new DeviceCategoriesActions.FetchDeviceCategories();
          })
        );
    })
  );

  @Effect()
  deleteDeviceCategory = this.actions$.pipe(
    ofType(DeviceCategoriesActions.DELETE_DEVICE_CATEGORY),
    switchMap((action: DeviceCategoriesActions.DeleteDeviceCategory) => {
      return this.http
        .delete(`${environment.APILink}/device_categories/${action.payload}`)
        .pipe(
          map(() => {
            return new DeviceCategoriesActions.FetchDeviceCategories();
          })
        );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
