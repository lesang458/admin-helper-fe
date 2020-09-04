import { DEVICE_HISTORY_ROUTES } from './device-history.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeviceHistoryListComponent } from './pages/device-history-list/device-history-list.component';
import { DeviceHistoryTableComponet } from './components/device-history-table/device-hisyory-table.component';
@NgModule({
  declarations: [DeviceHistoryListComponent, DeviceHistoryTableComponet],
  imports: [
    SharedModule,
    RouterModule.forChild(DEVICE_HISTORY_ROUTES),
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
})
export class DeviceHistoryModule {}
