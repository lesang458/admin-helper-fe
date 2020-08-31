import { Routes } from '@angular/router';
import { DayoffComponent } from './pages/dayoff/dayoff.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { DayoffResolver } from 'src/app/core/resolvers/dayoff.resolver';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: 'thong-tin-chung', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'thong-tin-chung',
    component: GeneralInfoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'nghi-phep',
    component: DayoffComponent,
    resolve: { dayoff: DayoffResolver },
  },
];
