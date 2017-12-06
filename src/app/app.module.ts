import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { FormsModule } from '@angular/forms';

import { ANGULAR_JS_MAIN_MODULE_NAME, AngularJsApp } from '../app-js/app';
import { upgradedAjsProviders } from './upgraded-ajs-providers';
import { SharedModule } from './shared/shared.module';

// components
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    UpgradeModule,
    SharedModule
  ],
  // Components and/or directives downgraded to AngularJS
  entryComponents: [
    DashboardComponent
  ],
  providers: [
    upgradedAjsProviders
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    new AngularJsApp().bootstrap();
    this.upgrade.bootstrap(document.body, [ANGULAR_JS_MAIN_MODULE_NAME], { strictDi: true });
  }
}
