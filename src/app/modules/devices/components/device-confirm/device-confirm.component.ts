import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as fromApp from '../../../../store/app.reducer';
import { TranslateService } from '@ngx-translate/core';
import { DeviceParams, SearchDevice } from '../../store/devices.actions';
import * as DevicesActions from '../../store/devices.actions';

@Component({
  selector: 'ah-device-confirm',
  templateUrl: './device-confirm.component.html',
  styleUrls: ['./device-confirm.component.scss'],
})
export class DeviceConfirmComponent implements OnInit {
  public id: number;
  public type: string;
  public params: SearchDevice;
  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  public getTitle(): string {
    if (this.type === 'discard') {
      return this.translate.instant('DEVICE_CONFIRM.DISCARD_TITLE');
    }
    return this.translate.instant('DEVICE_CONFIRM.INVENTORY_TITLE');
  }

  public getParam(): string {
    if (this.type === 'discard') {
      return this.translate.instant('DEVICE_CONFIRM.DISCARD_PARAM');
    }
    return this.translate.instant('DEVICE_CONFIRM.INVENTORY_PARAM');
  }

  public onConfirm(): void {
    const data: DeviceParams = {
      id: this.id,
      params: this.params,
    };
    if (this.type === 'discard') {
      this.store.dispatch(new DevicesActions.DiscardDevice(data));
    }
    if (this.type === 'inventory') {
      this.store.dispatch(new DevicesActions.MoveDeviceToInventory(data));
    }
    this.bsModalRef.hide();
  }
}
