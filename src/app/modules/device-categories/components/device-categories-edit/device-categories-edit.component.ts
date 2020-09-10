import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';
import { Store } from '@ngrx/store';
import * as DeviceCategoriesActions from '../../store/device-categories.actions';
import * as fromApp from '../../../../store/app.reducer';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ah-device-categories-edit',
  templateUrl: './device-categories-edit.component.html',
  styleUrls: ['./device-categories-edit.component.scss']
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
      this.f.patchValue({
        name: this.selectedCategory.name,
        description: this.selectedCategory.description,
      });
    }
  }

  public onSubmit(): void {
    if (this.type === 'create') {
      this.store.dispatch(
        new DeviceCategoriesActions.CreateDeviceCategory({
          name: this.f.get('name').value.toUpperCase(),
          description: this.f.get('description').value
        })
      );
    }
    if (this.type === 'edit') {
      const deviceCategoryParams: DeviceCategoriesActions.DeviceCategoryParams = {
        id: this.selectedCategory.id,
        deviceCategory: {
          name: this.f.get('name').value,
          description: this.f.get('description').value,
        }
      };
      this.store.dispatch(
        new DeviceCategoriesActions.UpdateDeviceCategory(deviceCategoryParams)
      );
    }
    if (this.type === 'delete') {
      this.store.dispatch(
        new DeviceCategoriesActions.DeleteDeviceCategory(
          this.selectedCategory.id.toString()
        )
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
