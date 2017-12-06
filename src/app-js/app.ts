// tourOfHeroesApp - application main module.
import { downgradeComponent } from '@angular/upgrade/static';

import * as angularJsModel from '../../node_modules/@types/angular/index';
declare var angular: angularJsModel.IAngularStatic;

import { AppRootComponent } from './app-root.component';
import { MainMenuComponent } from '../app/shared/main-menu/main-menu.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { HeroesComponent } from '../app/heroes/heroes.component';
import { ApiServiceFactory } from './core/virtual-api-service';
import { HeroServiceFactory } from './core/hero-service';

function configRouting ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({
    enabled: true
  });
  $routeProvider
    .when('/', {
      template: '<dashboard></dashboard>'
    })
    .when('/heroes/:heroId?', {
      template: '<heroes></heroes>'
    })
    .otherwise({
      redirectTo: '/'
    });
}
configRouting.$inject = ['$routeProvider', '$locationProvider'];

export const ANGULAR_JS_MAIN_MODULE_NAME = 'tourOfHeroesApp';
export class AngularJsApp {
  constructor() { }
  bootstrap() {
    angular
      .module(ANGULAR_JS_MAIN_MODULE_NAME, [
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
      ])
      .config(configRouting)
      .component('appRoot', AppRootComponent)
      .directive('mainMenu',
        downgradeComponent({component: MainMenuComponent}) as angularJsModel.IDirectiveFactory)
      .directive('dashboard',
        downgradeComponent({component: DashboardComponent}) as angularJsModel.IDirectiveFactory)
      .directive('heroes',
        downgradeComponent({component: HeroesComponent}) as angular.IDirectiveFactory)
      .factory('apiService', ApiServiceFactory)
      .factory('heroService', HeroServiceFactory);

    // angular.bootstrap(document.documentElement, ['tourOfHeroesApp']);
  }
}
