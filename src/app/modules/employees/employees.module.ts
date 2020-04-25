import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralListComponent } from './components/general-list/general-list.component';
import { EMPLOYEES_ROUTES } from './employees.routes';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';

@NgModule({
  declarations: [
    GeneralListComponent,
    GeneralInfoComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(EMPLOYEES_ROUTES)
  ]
})
export class EmployeesModule { }
