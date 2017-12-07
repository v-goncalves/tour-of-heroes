import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';

// services
import { HeroService } from './core/hero.service';
import { ApiService } from './core/virtual-api.service';
import { LoggerService } from './core/logger.service';

// components
import { AppRootComponent } from './app-root.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';

const appRoutes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/:heroId', component: HeroesComponent },
  { path: '',      component: DashboardComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppRootComponent,
    DashboardComponent,
    HeroesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    HeroService,
    ApiService,
    LoggerService
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule { }
