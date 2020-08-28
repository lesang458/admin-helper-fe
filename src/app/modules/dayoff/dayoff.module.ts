import { DAYOFF_ROUTES } from './dayoff.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DayOffListComponent } from './components/dayoff-list/dayoff-list.component';
import { GeneralDayOffComponent } from './pages/general-dayoff/general-dayoff.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DayOffListComponent, GeneralDayOffComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(DAYOFF_ROUTES),
    ReactiveFormsModule,
  ],
})
export class DayOffModule {}
