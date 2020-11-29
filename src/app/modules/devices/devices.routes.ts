import { Routes } from '@angular/router';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';
import { GeneralDeviceCategoriesComponent } from './pages/general-device-categories/general-device-categories.component';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { AdminGuard } from 'src/app/core/helpers/admin.guard';

export const DEVICES_ROUTES: Routes = [
  {
    path: '',
    component: DeviceListComponent,
    canActivate: [AuthGuardService, AdminGuard],
    data: {
      i18nKey: 'DEVICE_TABLE',
    },
  },
  {
    path: `${RouteConstant.categories}`,
    component: GeneralDeviceCategoriesComponent,
    canActivate: [AuthGuardService, AdminGuard],
    data: {
      i18nKey: 'DEVICE_CATEGORIES_PAGE',
    },
  },
];
