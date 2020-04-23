import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule)
  }
];
