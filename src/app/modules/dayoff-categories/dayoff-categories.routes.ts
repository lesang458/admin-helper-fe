import { Routes } from '@angular/router';
import { GeneralDayOffCategoriesComponent } from './pages/general-dayoff/general-dayoff-categories.component';

export const DAYOFF_CATEGORIES_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: GeneralDayOffCategoriesComponent },
];
