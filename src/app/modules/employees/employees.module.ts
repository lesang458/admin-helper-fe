import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralListComponent } from './components/general-list/general-list.component';
import { EMPLOYEES_ROUTES } from './employees.routes';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { DayoffComponent } from './pages/dayoff/dayoff.component';
import { DayoffTableComponent } from './components/dayoff-table/dayoff-table.component';
import { ProfileCreateComponent } from './components/profile-create/profile-create.component';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';

@NgModule({
  declarations: [
    GeneralListComponent,
    GeneralInfoComponent,
    DayoffComponent,
    DayoffTableComponent,
    ProfileCreateComponent,
    NotifyComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(EMPLOYEES_ROUTES),
    ReactiveFormsModule,
  ],
})
export class EmployeesModule {}
