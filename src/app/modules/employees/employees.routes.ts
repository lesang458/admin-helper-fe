import { Routes } from '@angular/router';
import { DayoffComponent } from './pages/dayoff/dayoff.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { DayoffResolver } from 'src/app/core/resolvers/dayoff.resolver';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: 'thong-tin-chung', pathMatch: 'full' },
  {
    path: 'login',
    component: AuthComponent,
    data: {
      i18nKey: 'LOGIN',
    },
  },
  {
    path: 'thong-tin-chung',
    component: GeneralInfoComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'GENERAL_LIST',
    },
  },
  {
    path: 'nghi-phep',
    component: DayoffComponent,
    canActivate: [AuthGuardService],
    resolve: { dayoff: DayoffResolver },
    data: {
      i18nKey: 'DAY_OFF_TABLE',
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '5xx',
    component: ErrorComponent,
    canActivate: [AuthGuardService],
  },
];
