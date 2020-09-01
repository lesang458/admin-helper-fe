import { DAYOFF_ROUTES } from './dayoff-categories.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GeneralDayOffComponent } from './pages/general-dayoff/general-dayoff-categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DayoffCreateEditComponent } from './components/dayoff-categories-create-edit/dayoff-create-edit.component';
import { DayOffListComponent } from './components/dayoff-categories-list/dayoff-list.component';

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
