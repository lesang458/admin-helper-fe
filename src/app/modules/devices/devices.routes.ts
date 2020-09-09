import { Routes } from '@angular/router';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';

export const DEVICES_ROUTES: Routes = [
  {
    path: '',
    component: DeviceListComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'DEVICE_TABLE',
    },
  },
];
