import { Routes } from '@angular/router';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', component: GeneralInfoComponent },
    ]
  }
];
