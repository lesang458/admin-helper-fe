import { Routes } from '@angular/router';
import { GeneralDayOffCategoriesComponent } from './pages/general-dayoff/general-dayoff-categories.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { DayOffRequestComponent } from './pages/dayoff-request/dayoff-request.component';

export const DAYOFF_CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    component: GeneralDayOffCategoriesComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'DAY_OFF_CATEGORIES_PAGE',
    },
  },
  {
    path: `${RouteConstant.dayOffRequest}`,
    component: DayOffRequestComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'DAY_OFF_REQUEST_PAGE',
    },
  },
];
