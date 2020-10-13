import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralListComponent } from './components/general-list/general-list.component';
import { EMPLOYEES_ROUTES } from './employees.routes';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { DayoffComponent } from './pages/dayoff/dayoff.component';
import { DayoffTableComponent } from './components/dayoff-table/dayoff-table.component';
import { RequestDayOffComponent } from './components/request-day-off/request-day-off.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { AuthComponent } from './pages/auth/auth.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeInfoComponent } from './pages/employee-info/employee-info.component';
import { StatusConfirmComponent } from './components/status-confirm/status-confirm.component';
import { DayOffRequestComponent } from './pages/dayoff-request/dayoff-request.component';
import { DayOffRequestListComponent } from './components/dayoff-request-list/dayoff-request-list.component';

@NgModule({
  declarations: [
    GeneralListComponent,
    GeneralInfoComponent,
    DayoffComponent,
    DayoffTableComponent,
    RequestDayOffComponent,
    StatusConfirmComponent,
    LoginComponent,
    AuthComponent,
    UpdatePasswordComponent,
    EmployeeDetailComponent,
    EmployeeInfoComponent,
    DayOffRequestComponent,
    DayOffRequestListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(EMPLOYEES_ROUTES),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [BsModalRef, DatePipe],
})
export class EmployeesModule {}
