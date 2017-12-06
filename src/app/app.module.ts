import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { ANGULAR_JS_MAIN_MODULE_NAME, AngularJsApp } from '../app-js/app';
import { upgradedAjsProviders } from './upgraded-ajs-providers';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    UpgradeModule,
    SharedModule
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
