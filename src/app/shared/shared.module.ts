import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BodyComponent } from './components/body/body.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

const modules = [
  CommonModule,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
];
const components = [
  SidebarComponent,
  HeaderComponent,
  BodyComponent,
  LoginComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
