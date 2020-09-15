import * as DevicesActions from './../../store/devices.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ah-device-categories-edit',
  templateUrl: './device-categories-edit.component.html',
  styleUrls: ['./device-categories-edit.component.scss'],
})
export class DeviceCategoriesEditComponent implements OnInit {
  public type: string;
  public selectedCategory: DeviceCategory;
  public f = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl(),
  });
  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    if (this.type === 'edit') {
      this.f.patchValue(this.selectedCategory);
    }
  }

  public onSubmit(): void {
    const deviceCategory: DeviceCategory = {
      name: this.f.get('name').value,
      description: this.f.get('description').value,
    };
    if (this.type === 'create') {
      this.store.dispatch(new DevicesActions.CreateDeviceCategory(deviceCategory));
    }
    if (this.type === 'edit') {
      const deviceCategoryParams: DevicesActions.DeviceCategoryParams = {
        id: this.selectedCategory.id,
        deviceCategory,
      };
      this.store.dispatch(
        new DevicesActions.UpdateDeviceCategory(deviceCategoryParams)
      );
    }
    if (this.type === 'delete') {
      this.store.dispatch(
        new DevicesActions.DeleteDeviceCategory(this.selectedCategory.id.toString())
      );
    }

    this.bsModalRef.hide();
  }

  public checkChange(): boolean {
    return (
      !this.f.valid ||
      (this.selectedCategory?.name.toLowerCase() ===
        this.f.get('name').value.toLowerCase() &&
        this.selectedCategory?.description?.toLowerCase() ===
          this.f.get('description').value?.toLowerCase())
    );
  }
}
