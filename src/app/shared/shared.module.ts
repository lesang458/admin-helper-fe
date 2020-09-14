import { NgxLoadingModule } from 'ngx-loading';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BodyComponent } from './components/body/body.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ErrorComponent } from './components/error/error.component';
import { RouterModule } from '@angular/router';

const modules = [
  CommonModule,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];
const components = [
  SidebarComponent,
  HeaderComponent,
  BodyComponent,
  LoadingSpinnerComponent,
  ErrorComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules, NgxLoadingModule.forRoot({})],
  exports: [...components, ...modules],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '644766504476-ajv6joaa9d6pkfec6fg8h7ddlkaptkf5.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class SharedModule {}
