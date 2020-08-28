import { DAYOFF_ROUTES } from './dayoff.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DayOffListComponent } from './components/dayoff-list/dayoff-list.component';
import { GeneralDayOffComponent } from './pages/general-dayoff/general-dayoff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DayoffCreateEditComponent } from './components/dayoff-create-edit/dayoff-create-edit.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    DayOffListComponent,
    GeneralDayOffComponent,
    DayoffCreateEditComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(DAYOFF_ROUTES),
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
})
export class DayOffModule {}
