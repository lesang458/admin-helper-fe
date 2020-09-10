import { Routes } from '@angular/router';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';
import { GeneralDeviceCategoriesComponent } from './pages/general-device-categories/general-device-categories.component';

export const DEVICES_ROUTES: Routes = [
  {
    path: '',
    component: DeviceListComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'DEVICE_TABLE',
    },
  },
  {
    path: 'the-loai',
    component: GeneralDeviceCategoriesComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'DEVICE_CATEGORIES_PAGE',
    },
  },
];
