import { BrowserSupportGuardService } from './../../core/helpers/browser-support.guard';
import { Routes } from '@angular/router';
import { DayoffComponent } from './pages/dayoff/dayoff.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { DayoffResolver } from 'src/app/core/resolvers/dayoff.resolver';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuardService } from 'src/app/core/helpers/auth.guard';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { DayOffRequestComponent } from './pages/dayoff-request/dayoff-request.component';
import { EmployeeCreatePageComponent } from './pages/employee-create-page/employee-create-page.component';
import { EmployeeEditPageComponent } from './pages/employee-edit-page/employee-edit-page.component';
import { AdminGuard } from 'src/app/core/helpers/admin.guard';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', redirectTo: `/${RouteConstant.employees}`, pathMatch: 'full' },
  {
    path: `${RouteConstant.login}`,
    component: AuthComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'LOGIN',
    },
  },
  {
    path: `${RouteConstant.employees}`,
    canActivateChild: [AuthGuardService, AdminGuard],
    children: [
      {
        path: '',
        component: GeneralInfoComponent,
        data: {
          i18nKey: 'GENERAL_LIST',
        },
      },
      {
        path: `create`,
        component: EmployeeCreatePageComponent,
        data: {
          i18nKey: 'EMPLOYEE_CREATE',
        },
      },
      {
        path: `:id`,
        component: EmployeeDetailsComponent,
        data: {
          i18nKey: 'EMPLOYEE_DETAIL',
        },
      },
      {
        path: `:id/edit`,
        component: EmployeeEditPageComponent,
        data: {
          i18nKey: 'EMPLOYEE_EDIT',
        },
      },
    ],
  },
  {
    path: `${RouteConstant.dayOff}`,
    component: DayoffComponent,
    canActivate: [AuthGuardService, AdminGuard],
    resolve: { dayoff: DayoffResolver },
    data: {
      i18nKey: 'DAY_OFF_TABLE',
    },
  },
  {
    path: `${RouteConstant.page404}`,
    component: ErrorComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'PAGE_404',
    },
  },
  {
    path: `${RouteConstant.page5xx}`,
    component: ErrorComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'PAGE_5XX',
    },
  },
  {
    path: `${RouteConstant.changePassword}`,
    component: UpdatePasswordComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'CHANGE_PASSWORD',
    },
  },
  {
    path: `${RouteConstant.resetPassword}`,
    component: UpdatePasswordComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'RESET_PASSWORD',
    },
  },
  {
    path: `${RouteConstant.notSupported}`,
    component: ErrorComponent,
    canActivate: [BrowserSupportGuardService],
    data: {
      i18nKey: 'NOT_SUPPORTED',
    },
  },
  {
    path: `${RouteConstant.dayOffRequest}`,
    component: DayOffRequestComponent,
    canActivate: [AuthGuardService, AdminGuard],
    data: {
      i18nKey: 'DAY_OFF_REQUEST_PAGE',
    },
  },
  {
    path: `${RouteConstant.accountInformation}`,
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'ACCOUNT_INFORMATION',
    },
  },
  {
    path: `${RouteConstant.accountInformation}/edit`,
    component: EmployeeEditPageComponent,
    canActivate: [AuthGuardService],
    data: {
      i18nKey: 'ACCOUNT_INFORMATION',
    },
  },
];
