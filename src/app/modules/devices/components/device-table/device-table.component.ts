import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';
import * as DevicesActions from '../../store/devices.actions';
import { TranslateService } from '@ngx-translate/core';
import { DeviceParams } from '../../store/devices.actions';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';
import { FormControl } from '@angular/forms';
import { State } from '../../store/devices.reducer';
import { Device } from 'src/app/shared/models/device.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeviceEditComponent } from '../device-edit/device-edit.component';

@Component({
  selector: 'ah-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss'],
})
export class DeviceTableComponent implements OnInit {
  public data$: Observable<State>;
  public categories$: Observable<DeviceCategory[]>;
  public currentPage = 1;
  public selectedCategory = new FormControl('');
  public deviceParams: DeviceParams;
  public bsModalRef: BsModalRef;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.data$ = this.store.select('devices');
    this.store.dispatch(new DevicesActions.FetchDeviceCategories());
    this.onPageChanged(1);

    this.selectedCategory.valueChanges.subscribe(() => {
      if (this.currentPage === 1) {
        this.onPageChanged(1);
      } else {
        this.currentPage = 1;
      }
    });
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
      deviceCategoryId: this.selectedCategory.value,
    };
    this.store.dispatch(new DevicesActions.FetchDevices(this.deviceParams));
  }

  public openModalWithComponent(
    selectedDevice: Device,
    params: DeviceParams
  ): void {
    const initialState = { selectedDevice, params };
    this.bsModalRef = this.modalService.show(DeviceEditComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
