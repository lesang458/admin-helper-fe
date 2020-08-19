import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BodyComponent } from './components/body/body.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

const modules = [
  CommonModule,
  TranslateModule
];
const components = [
  SidebarComponent,
  HeaderComponent,
  BodyComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }
