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
    path: 'dayoff',
    loadChildren: () =>
      import('./modules/dayoff/dayoff.module').then((m) => m.DayOffModule),
  },
];
