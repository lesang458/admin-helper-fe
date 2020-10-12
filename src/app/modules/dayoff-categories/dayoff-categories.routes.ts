import { Routes } from '@angular/router';
import { GeneralDayOffCategoriesComponent } from './pages/general-dayoff/general-dayoff-categories.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';

export const DAYOFF_CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    component: GeneralDayOffCategoriesComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'DAY_OFF_CATEGORIES_PAGE',
    },
  },
];
