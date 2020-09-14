import * as DevicesActions from './../../store/devices.actions';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer'
import { DeviceCategory } from 'src/app/shared/models/deviceCategory';
import { DeviceCategoriesEditComponent } from '../device-categories-edit/device-categories-edit.component';

@Component({
  selector: 'ah-device-categories-list',
  templateUrl: './device-categories-list.component.html',
  styleUrls: ['./device-categories-list.component.scss']
})
export class DeviceCategoriesListComponent implements OnInit {
  public data$: Observable<any>;
  public bsModalRef: BsModalRef;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new DevicesActions.FetchDeviceCategories());
    this.data$ = this.store.select('devices');
  }

  public openModalWithComponent(
    selectedCategory?: DeviceCategory,
    type?: string
  ): void {
    const initialState = { selectedCategory, type };
    this.bsModalRef = this.modalService.show(DeviceCategoriesEditComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
