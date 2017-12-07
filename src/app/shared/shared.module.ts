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
  exports: [
    MainMenuComponent
  ]
})
export class SharedModule  {}
