import { Routes } from '@angular/router';
import { DayoffComponent } from './pages/dayoff/dayoff.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { DayoffResolver } from 'src/app/core/resolvers/dayoff.resolver';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';
import { GeneralDayOffCategoriesComponent } from '../dayoff-categories/pages/general-dayoff/general-dayoff-categories.component';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: 'thong-tin-chung', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'thong-tin-chung',
    component: GeneralInfoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'loai-ngay-phep',
    component: GeneralDayOffCategoriesComponent,
    canActivate: [AuthGuardService],
    resolve: { dayoff: DayoffResolver },
  },
];
