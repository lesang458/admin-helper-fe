import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeviceCategoriesListComponent } from './components/device-categories-list/device-categories-list.component';
import { DEVICE_CATEGORIES_ROUTES } from './device-categories.routes';
import { GeneralDeviceCategoriesComponent } from './pages/general-device-categories/general-device-categories.component';
import { DeviceCategoriesEditComponent } from './components/device-categories-edit/device-categories-edit.component';

@NgModule({
  declarations: [
    DeviceCategoriesListComponent,
    GeneralDeviceCategoriesComponent,
    DeviceCategoriesEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(DEVICE_CATEGORIES_ROUTES),
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
})
export class DeviceCategoriesModule {}
