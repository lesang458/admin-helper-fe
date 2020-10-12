import { Routes } from '@angular/router';
import { RouteConstant } from './shared/constants/route.constant';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: `${RouteConstant.devices}`,
    loadChildren: () =>
      import('./modules/devices/devices.module').then((m) => m.DevicesModule),
  },
  {
    path: `${RouteConstant.dayOffCategories}`,
    loadChildren: () =>
      import('./modules/dayoff-categories/dayoff-categories.module').then(
        (m) => m.DayOffCategoriesModule
      ),
  },
  {
    path: `${RouteConstant.dayOffRequest}`,
    loadChildren: () =>
      import('./modules/dayoff-categories/dayoff-categories.module').then(
        (m) => m.DayOffCategoriesModule
      ),
  },
  {
    path: `${RouteConstant.deviceHistory}`,
    loadChildren: () =>
      import('./modules/devices-history/device-history.module').then(
        (m) => m.DeviceHistoryModule
      ),
  },
  {
    path: '**',
    redirectTo: `/${RouteConstant.page404}`,
  },
];
