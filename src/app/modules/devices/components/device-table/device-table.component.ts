import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { Device } from 'src/app/shared/models/device.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as DevicesActions from '../../store/devices.actions';

@Component({
  selector: 'ah-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss'],
})
export class DeviceTableComponent implements OnInit {
  public data$: Observable<PaginatedData<Device[]>>;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.data$ = this.store.select('devices').pipe(
      map((data) => {
        return data.devices;
      })
    );

    this.store.dispatch(new DevicesActions.FetchDevices());
  }
}
