import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: 'thiet-bi',
    loadChildren: () =>
      import('./modules/devices/devices.module').then((m) => m.DevicesModule),
  },
  {
    path: 'loai-ngay-phep',
    loadChildren: () =>
      import('./modules/dayoff-categories/dayoff-categories.module').then(
        (m) => m.DayOffCategoriesModule
      ),
  },
  {
    path: 'lich-su-thiet-bi',
    loadChildren: () =>
      import('./modules/devices-history/device-history.module').then(
        (m) => m.DeviceHistoryModule
      ),
  },
];
