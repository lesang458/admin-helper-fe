import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';
import * as DevicesActions from '../../store/devices.actions';
import { TranslateService } from '@ngx-translate/core';
import { SearchDevice, DeviceParams } from '../../store/devices.actions';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';
import { FormControl } from '@angular/forms';
import { State } from '../../store/devices.reducer';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeviceAssignComponent } from '../device-assign/device-assign.component';
import { Device } from 'src/app/shared/models/device.model';
import { DeviceEditComponent } from '../device-edit/device-edit.component';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DevicesHistoryService } from 'src/app/core/services/devices-history.service';
import { DeviceConfirmComponent } from '../device-confirm/device-confirm.component';

@Component({
  selector: 'ah-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss'],
})
export class DeviceTableComponent implements OnInit {
  public data$: Observable<State>;
  public categories$: Observable<DeviceCategory[]>;
  public state: boolean[];
  public currentPage = 1;
  public selectedStatus = new FormControl('');
  public selectedCategory = new FormControl('');
  public deviceParams: DeviceParams;
  public bsModalRef: BsModalRef;
  public searchParams: SearchDevice;

  constructor(
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private modalService: BsModalService,
    private router: Router,
    private devicesHistoryService: DevicesHistoryService
  ) {}

  ngOnInit(): void {
    this.data$ = this.store.select('devices').pipe(
      tap((data) => {
        this.state = new Array<boolean>(data.devices.pagination.pageSize);
        this.state = this.state.map(() => false);
      })
    );
    this.store.dispatch(new DevicesActions.FetchDeviceCategories());
    this.onPageChanged(1);

    this.selectedCategory.valueChanges.subscribe(() => {
      this.onDataChanged();
    });

    this.selectedStatus.valueChanges.subscribe(() => {
      this.onDataChanged();
    });
  }

  public getUserName(user: any): string {
    return user
      ? `${user.firstName} ${user.lastName}`
      : this.translate.instant('DEVICE_TABLE.EMPTY');
  }

  public onPageChanged(page: number): void {
    this.searchParams = {
      page,
      perPage: 5,
      status: this.selectedStatus.value,
      deviceCategoryId: this.selectedCategory.value,
    };
    this.store.dispatch(new DevicesActions.FetchDevices(this.searchParams));
  }

  public onDataChanged(): void {
    if (this.currentPage === 1) {
      this.onPageChanged(1);
    } else {
      this.currentPage = 1;
    }
  }

  public navigateToDeviceHistory(id: number): void {
    this.devicesHistoryService.setCurrentId(id);
    this.router.navigateByUrl('/lich-su-thiet-bi');
  }

  public openEditModal(selectedDevice: Device, params: SearchDevice): void {
    const initialState = { selectedDevice, params };
    this.bsModalRef = this.modalService.show(DeviceEditComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openAssignModal(device: Device, params: SearchDevice): void {
    const initialState = { device, params };
    this.bsModalRef = this.modalService.show(DeviceAssignComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openConfirmModal(id: number, type: string, params: SearchDevice): void {
    const initialState = { id, type, params };
    this.bsModalRef = this.modalService.show(DeviceConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
