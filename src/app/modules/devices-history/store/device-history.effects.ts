import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as DevicesHistoryActions from './devices-history.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import * as snakecaseKeys from 'snakecase-keys';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as camelcaseKeys from 'camelcase-keys';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';

@Injectable()
export class DeviceHistoryEffects {
  @Effect()
  getDevicesHistory = this.actions$.pipe(
    ofType(DevicesHistoryActions.FETCH_DEVICE_HISTORY),
    switchMap((action: DevicesHistoryActions.FetchDeviceHistory) => {
      console.log('DeviceHistoryEffects -> action', action);
      return this.http
        .get<PaginatedData<DeviceHistory[]>>(
          `${environment.APILink}/device_histories`,
          {
            observe: 'response',
          }
        )
        .pipe(
          map((response) => {
            console.log('DeviceHistoryEffects -> response', response);
            const data = camelcaseKeys(response.body, { deep: true });
            return new DevicesHistoryActions.GetDeviceHistorySuccess(data);
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
