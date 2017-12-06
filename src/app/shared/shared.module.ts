import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMenuComponent } from './main-menu/main-menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainMenuComponent
  ],
  // Components and/or directives downgraded to AngularJS
  entryComponents: [
    MainMenuComponent
  ]
})
export class SharedModule  {}
