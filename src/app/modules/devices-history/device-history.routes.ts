import { Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';
import { DevicesHistoryGuardService } from 'src/app/core/helpers/devices-history.guard';
import { DeviceHistoryListComponent } from './pages/device-history-list/device-history-list.component';

export const DEVICE_HISTORY_ROUTES: Routes = [
  {
    path: '',
    component: DeviceHistoryListComponent,
    canActivate: [AuthGuardService, DevicesHistoryGuardService],
  },
];
