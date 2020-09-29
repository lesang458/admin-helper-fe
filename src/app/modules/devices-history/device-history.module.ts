import { DEVICE_HISTORY_ROUTES } from './device-history.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeviceHistoryListComponent } from './pages/device-history-list/device-history-list.component';
import { DeviceHistoryTableComponent } from './components/device-history-table/device-history-table.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DeviceHistoryDetailComponent } from './components/device-history-detail/device-history-detail.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    DeviceHistoryListComponent,
    DeviceHistoryTableComponent,
    DeviceHistoryDetailComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(DEVICE_HISTORY_ROUTES),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  providers: [DatePipe],
})
export class DeviceHistoryModule {}
