import { Routes } from '@angular/router';
import { GeneralDayOffComponent } from './pages/general-dayoff/general-dayoff-categories.component';

export const DAYOFF_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: GeneralDayOffComponent },
];
