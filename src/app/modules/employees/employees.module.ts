import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EMPLOYEES_ROUTES } from './employees.routes';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';

@NgModule({
  declarations: [
    GeneralInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EMPLOYEES_ROUTES)
  ]
})
export class EmployeesModule { }
