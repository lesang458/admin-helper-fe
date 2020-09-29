import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromApp from '../../../../store/app.reducer';
import * as DevicesHistoryActions from '../../store/devices-history.actions';
import * as DevicesActions from '../../../devices/store/devices.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { map } from 'rxjs/operators';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { FormControl } from '@angular/forms';
import { State } from 'src/app/modules/devices/store/devices.reducer';
import { DeviceHistoryDetailComponent } from '../device-history-detail/device-history-detail.component';
import { Router, NavigationEnd } from '@angular/router';
import { DevicesHistoryService } from 'src/app/core/services/devices-history.service';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ah-device-history-table',
  templateUrl: './device-history-table.component.html',
  styleUrls: ['./device-history-table.component.scss'],
})
export class DeviceHistoryTableComponent implements OnInit {
  public data$: Observable<PaginatedData<DeviceHistory[]>>;
  public categories$: Observable<State>;
  public searchStatusFormControl = new FormControl('');
  public selectedFromDate = new FormControl('');
  public selectedToDate = new FormControl('');
  public bsModalRef: BsModalRef;
  public currentPage = 1;
  public validToDate: string;
  public validFromDate: string;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService,
    private router: Router,
    private devicesHistoryService: DevicesHistoryService,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) {
    router.events.subscribe((val: NavigationEnd) => {
      if (val.url && val.url !== `/${RouteConstant.deviceHistory}`) {
        devicesHistoryService.setCurrentId(-1);
      }
    });
  }

  ngOnInit(): void {
    this.data$ = this.store.select('deviceHistory').pipe(
      map((devices) => {
        return devices.deviceHistory;
      })
    );

    this.onPageChanged(1);
    this.categories$ = this.store.select('devices');
    this.store.dispatch(new DevicesActions.FetchDeviceCategories());
    this.searchStatusFormControl.valueChanges.subscribe(() => {
      this.onDataChanged();
    });

    this.selectedFromDate.valueChanges.subscribe(() => {
      this.onDataChanged();
    });

    this.selectedToDate.valueChanges.subscribe(() => {
      this.onDataChanged();
    });
  }

  public onDataChanged(): void {
    this.currentPage === 1 ? this.onPageChanged(1) : (this.currentPage = 1);
  }

  public onPageChanged(page: number): void {
    this.validToDate = this.selectedFromDate.value;
    this.validFromDate = this.selectedToDate.value;
    const status = this.searchStatusFormControl.value;
    const historyFrom = this.validToDate;
    const historyTo = this.validFromDate;
    const deviceId = this.devicesHistoryService.getCurrentId().toString();
    const params = {
      page,
      perPage: 10,
      status,
      historyFrom,
      historyTo,
      deviceId,
    };
    this.store.dispatch(new DevicesHistoryActions.FetchDeviceHistory(params));
  }

  public openModalWithComponent(id: number): void {
    const initialState = { id };
    this.bsModalRef = this.modalService.show(DeviceHistoryDetailComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
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
