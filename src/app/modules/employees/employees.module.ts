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
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { AuthComponent } from './pages/auth/auth.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { StatusConfirmComponent } from './components/status-confirm/status-confirm.component';
import { DayOffRequestComponent } from './pages/dayoff-request/dayoff-request.component';
import { DayOffRequestListComponent } from './components/dayoff-request-list/dayoff-request-list.component';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeCreatePageComponent } from './pages/employee-create-page/employee-create-page.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeEditPageComponent } from './pages/employee-edit-page/employee-edit-page.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { PayrollDetailComponent } from './components/payroll-detail/payroll-detail.component';
import { PayrollPageComponent } from './pages/payroll-page/payroll-page.component';

const CustomSelectOptions: INgxSelectOptions = {
  optionValueField: 'id',
  optionTextField: 'name',
  keepSelectedItems: false,
};
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
    EmployeeDetailsComponent,
    DayOffRequestComponent,
    DayOffRequestListComponent,
    EmployeeCreateComponent,
    EmployeeCreatePageComponent,
    EmployeeEditComponent,
    EmployeeEditPageComponent,
    ConfirmModalComponent,
    PayrollDetailComponent,
    PayrollPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxCurrencyModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    RouterModule.forChild(EMPLOYEES_ROUTES),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [BsModalRef, DatePipe],
})
export class EmployeesModule {}
