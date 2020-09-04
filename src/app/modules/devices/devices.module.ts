import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { DEVICES_ROUTES } from './devices.routes';
import { DeviceTableComponent } from './components/device-table/device-table.component';

@NgModule({
  declarations: [DeviceListComponent, DeviceTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(DEVICES_ROUTES),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ],
})
export class DevicesModule {}
