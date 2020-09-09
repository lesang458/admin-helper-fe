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

@Component({
  selector: 'ah-device-history-table',
  templateUrl: './device-history-table.component.html',
  styleUrls: ['./device-history-table.component.scss']
})
export class DeviceHistoryTableComponent implements OnInit {
  public data$: Observable<PaginatedData<DeviceHistory[]>>;
  public categories$: Observable<State>;
  public searchStatusFormControl = new FormControl('');
  public selectedFromDate = new FormControl('');
  public selectedToDate = new FormControl('');
  public bsModalRef: BsModalRef;
  public currentPage = 1;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService,
    private router: Router,
    private devicesHistoryService: DevicesHistoryService
  ) {
    router.events.subscribe((val: NavigationEnd) => {
      if (val.url && val.url !== '/lich-su-thiet-bi') {
        devicesHistoryService.setCurrentId(-1);
      }
  });
  }

  ngOnInit(): void {
    this.data$ = this.store.select('deviceHistory').pipe(
      map((devices) => {
        return {
          data: devices.deviceHistory.data.filter((data) => {
          if (data.device.id === this.devicesHistoryService.getCurrentId())
            return data;
          }),
          pagination: devices.deviceHistory.pagination
        }
      })
    );

    this.onPageChanged(1);
    this.categories$ = this.store.select('devices')
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
    if (this.currentPage === 1) {
      this.onPageChanged(1);
    } else {
      this.currentPage = 1;
    }
  }

  public onPageChanged(page: number): void {
     const status = this.searchStatusFormControl.value;
     const historyFrom= this.selectedFromDate.value;
     const historyTo= this.selectedToDate.value;
     const params = {
       page,
       perPage: 10,
       status,
       historyFrom,
       historyTo
      }
     this.store.dispatch(new DevicesHistoryActions.FetchDeviceHistory(params));

}

  public openModalWithComponent(id: number): void {
    const initialState = { id };
    this.bsModalRef = this.modalService.show(DeviceHistoryDetailComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
