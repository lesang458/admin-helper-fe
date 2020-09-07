import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/shared/models/device.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeviceParams } from '../../store/devices.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ah-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss'],
})
export class DeviceEditComponent implements OnInit {
  public selectedDevice: Device;
  public params: DeviceParams;
  public categories$: Observable<DeviceCategory[]>;
  public deviceForm = new FormGroup({
    name: new FormControl('', Validators.maxLength(100)),
    price: new FormControl('', Validators.pattern('^[0-9]+$')),
    description: new FormControl(''),
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
        this.f.deviceCategoryId.patchValue(data.categories[0].id);
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
    return this.translate.instant('DEVICE_EDIT.PRICE_PATTERN');
  }

  public onSubmit(): void {
    console.log(this.deviceForm.value);
  }
}
