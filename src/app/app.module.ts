import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { FormsModule } from '@angular/forms';

import { ANGULAR_JS_MAIN_MODULE_NAME, AngularJsApp } from '../app-js/app';
import { upgradedAjsProviders } from './upgraded-ajs-providers';
import { SharedModule } from './shared/shared.module';

// services
import { HeroService } from './core/hero.service';

// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    UpgradeModule,
    SharedModule
  ],
  // Components and/or directives downgraded to AngularJS
  entryComponents: [
    DashboardComponent,
    HeroesComponent
  ],
  providers: [
    HeroService,
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
