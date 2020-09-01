import { Routes } from '@angular/router';
import { DayoffComponent } from './pages/dayoff/dayoff.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { DayoffResolver } from 'src/app/core/resolvers/dayoff.resolver';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: 'thong-tin-chung', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'thong-tin-chung',
    component: GeneralInfoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'nghi-phep',
    component: DayoffComponent,
    canActivate: [AuthGuardService],
    resolve: { dayoff: DayoffResolver },
  },
];
