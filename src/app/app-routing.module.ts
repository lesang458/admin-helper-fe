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
    path: 'ngay-nghi',
    loadChildren: () =>
      import('./modules/dayoff-categories/dayoff-categories.module').then(
        (m) => m.DayOffCategoriesModule
      ),
  },
];
