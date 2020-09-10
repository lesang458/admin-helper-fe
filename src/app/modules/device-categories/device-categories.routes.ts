import { Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';
import { GeneralDeviceCategoriesComponent } from './pages/general-device-categories/general-device-categories.component';

export const DEVICE_CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    component: GeneralDeviceCategoriesComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'DEVICE_CATEGORIES_PAGE',
    },
  },
];
