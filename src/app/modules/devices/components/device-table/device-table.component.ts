import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { Device } from 'src/app/shared/models/device.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as DevicesActions from '../../store/devices.actions';
import { TranslateService } from '@ngx-translate/core';
import { DeviceParams } from '../../store/devices.actions';

@Component({
  selector: 'ah-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss'],
})
export class DeviceTableComponent implements OnInit {
  public data$: Observable<PaginatedData<Device[]>>;
  public currentPage = 1;
  public deviceParams: DeviceParams;
  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.data$ = this.store.select('devices').pipe(
      map((data) => {
        return data.devices;
      })
    );

    this.onPageChanged(1);
  }

  public onExpand(id): void {
    const el: HTMLElement = document.getElementById(id);
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }

  public getUserName(user: any): string {
    return user
      ? `${user.firstName} ${user.lastName}`
      : this.translate.instant('DEVICE_TABLE.EMPTY');
  }

  public onPageChanged(page: number): void {
    this.deviceParams = {
      page,
      perPage: 5,
      deviceCategoryId: 0,
    };
    this.store.dispatch(new DevicesActions.FetchDevices(this.deviceParams));
  }
}
