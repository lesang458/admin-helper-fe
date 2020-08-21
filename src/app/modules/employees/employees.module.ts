import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralListComponent } from './components/general-list/general-list.component';
import { EMPLOYEES_ROUTES } from './employees.routes';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { DayoffComponent } from './pages/dayoff/dayoff.component';
import { DayoffTableComponent } from './components/dayoff-table/dayoff-table.component';

@NgModule({
  declarations: [
    GeneralListComponent,
    GeneralInfoComponent,
    DayoffComponent,
    DayoffTableComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(EMPLOYEES_ROUTES),
    ReactiveFormsModule,
  ],
})
export class EmployeesModule {}
