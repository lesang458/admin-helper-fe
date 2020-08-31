import { EmployeeEffects } from './modules/employees/store/employees.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { EmployeesModule } from './modules/employees/employees.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomTranslateLoader } from './shared/loader/custom-translate.loader';
import { AuthEffect } from './shared/store/auth.effects';

export function LoaderFactory() {
  return new CustomTranslateLoader();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    EmployeesModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LoaderFactory,
      },
    }),
    RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' }),
    EffectsModule.forRoot([EmployeeEffects, AuthEffect]),
    StoreModule.forRoot(fromApp.appReducer),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
