import { Routes } from '@angular/router';
import { DayoffComponent } from './pages/dayoff/dayoff.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { DayoffResolver } from 'src/app/core/resolvers/dayoff.resolver';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: 'thong-tin-chung', pathMatch: 'full' },
  { path: 'thong-tin-chung', component: GeneralInfoComponent },
  {
    path: 'nghi-phep',
    component: DayoffComponent,
    resolve: { dayoff: DayoffResolver },
  },
];
