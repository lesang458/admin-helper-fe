import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { DEVICES_ROUTES } from './devices.routes';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { DeviceAssignComponent } from './components/device-assign/device-assign.component';
import { DeviceEditComponent } from './components/device-edit/device-edit.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { DeviceCategoriesEditComponent } from './components/device-categories-edit/device-categories-edit.component';
import { DeviceCategoriesListComponent } from './components/device-categories-list/device-categories-list.component';
import { GeneralDeviceCategoriesComponent } from './pages/general-device-categories/general-device-categories.component';

@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceTableComponent,
    DeviceAssignComponent,
    DeviceEditComponent,
    DeviceCategoriesEditComponent,
    DeviceCategoriesListComponent,
    GeneralDeviceCategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(DEVICES_ROUTES),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [BsModalRef],
})
export class DevicesModule {}
