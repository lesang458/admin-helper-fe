import { GeneralDayOffCategoriesComponent } from './pages/general-dayoff/general-dayoff-categories.component';
import { DAYOFF_CATEGORIES_ROUTES } from './dayoff-categories.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DayOffCategoriesListComponent } from './components/dayoff-categories-list/dayoff-categories-list.component';
import { DayOffCategoryEditComponent } from './components/dayoff-category-edit/dayoff-category-edit.component';
@NgModule({
  declarations: [
    DayOffCategoriesListComponent,
    GeneralDayOffCategoriesComponent,
    DayOffCategoryEditComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(DAYOFF_CATEGORIES_ROUTES),
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
})
export class DayOffCategoriesModule {}
