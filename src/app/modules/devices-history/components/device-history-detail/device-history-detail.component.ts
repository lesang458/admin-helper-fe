import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as DevicesHistoryActions from '../../store/devices-history.actions';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ah-device-history-detail',
  templateUrl: './device-history-detail.component.html',
  styleUrls: ['./device-history-detail.component.scss'],
})
export class DeviceHistoryDetailComponent implements OnInit {
  public id: number;
  public data: DeviceHistory;
  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new DevicesHistoryActions.DetailDeviceHistory(this.id));
    this.store
      .select((s) => s.deviceHistory.detailDeviceHistory)
      .subscribe((data: DeviceHistory) => {
        if (data) {
          this.data = data;
        }
      });
  }

  public getUserName(user: any): string {
    return user
      ? `${user.firstName} ${user.lastName}`
      : this.translate.instant('DEVICE_TABLE.EMPTY');
  }

  public getToDate(date: Date): string {
    return date
      ? this.datePipe.transform(date, 'dd/MM/yyyy')
      : this.translate.instant('DEVICE_HISTORY.PRESENT');
  }
}
