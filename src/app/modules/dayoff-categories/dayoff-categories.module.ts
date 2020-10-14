import { GeneralDayOffCategoriesComponent } from './pages/general-dayoff/general-dayoff-categories.component';
import { DAYOFF_CATEGORIES_ROUTES } from './dayoff-categories.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DayOffCategoriesListComponent } from './components/dayoff-categories-list/dayoff-categories-list.component';
import { DayOffCategoryEditComponent } from './components/dayoff-category-edit/dayoff-category-edit.component';
import { TitleCasePipe } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    DayOffCategoriesListComponent,
    GeneralDayOffCategoriesComponent,
    DayOffCategoryEditComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(DAYOFF_CATEGORIES_ROUTES),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  providers: [TitleCasePipe],
})
export class DayOffCategoriesModule {}
