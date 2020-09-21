import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/shared/models/device.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeviceParams, SearchDevice } from '../../store/devices.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as DevicesActions from '../../store/devices.actions';

@Component({
  selector: 'ah-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss'],
})
export class DeviceEditComponent implements OnInit {
  public selectedDevice: Device;
  public params: SearchDevice;
  public categories$: Observable<DeviceCategory[]>;
  public deviceForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.min(1),
    ]),
    description: new FormControl('', Validators.minLength(5)),
    deviceCategoryId: new FormControl(''),
  });
  constructor(
    public bsModalRef: BsModalRef,
    public store: Store<fromApp.AppState>,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.store.select('devices').pipe(
      map((data) => {
        if (!this.selectedDevice) {
          this.f.deviceCategoryId.patchValue(data.categories[0].id);
        }
        return data.categories;
      })
    );

    if (this.selectedDevice) {
      this.deviceForm.patchValue(this.selectedDevice);
    }
  }

  get f() {
    return this.deviceForm.controls;
  }

  public getNameErrorMessage(): string {
    if (this.f.name.errors.required) {
      return this.translate.instant('DEVICE_EDIT.DEVICE_NAME_REQUIRED');
    }
    return this.translate.instant('DEVICE_EDIT.DEVICE_NAME_MAX_LENGTH');
  }

  public getPriceErrorMessage(): string {
    if (this.f.price.errors.required) {
      return this.translate.instant('DEVICE_EDIT.PRICE_REQUIRED');
    }
    if (this.f.price.errors.min) {
      return this.translate.instant('DEVICE_EDIT.PRICE_MIN');
    }
    return this.translate.instant('DEVICE_EDIT.PRICE_PATTERN');
  }

  public onSubmit(): void {
    const device: Device = {
      name: this.f.name.value,
      price: +this.f.price.value,
      deviceCategoryId: +this.f.deviceCategoryId.value,
      description: this.f.description.value,
    };
    const id = this.selectedDevice ? this.selectedDevice.id : 0;
    const deviceParams: DeviceParams = {
      id,
      device,
      params: this.params,
    };
    this.selectedDevice
      ? this.store.dispatch(new DevicesActions.EditDevice(deviceParams))
      : this.store.dispatch(new DevicesActions.CreateDevice(deviceParams));
    this.bsModalRef.hide();
  }
}
