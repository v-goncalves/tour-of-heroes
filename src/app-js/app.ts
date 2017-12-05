// tourOfHeroesApp - application main module.

import * as angularJsModel from '../../node_modules/@types/angular/index';
declare var angular: angularJsModel.IAngularStatic;

import { AppRootComponent } from './app-root.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ApiServiceFactory } from './core/virtual-api-service';
import { HeroServiceFactory } from './core/hero-service';


angular
  .module('tourOfHeroesApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
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
  })
  .component('appRoot', AppRootComponent)
  .component('mainMenu', MainMenuComponent)
  .component('dashboard', DashboardComponent)
  .component('heroes', HeroesComponent)
  .factory('apiService', ApiServiceFactory)
  .factory('heroService', HeroServiceFactory);

angular.bootstrap(document.documentElement, ['tourOfHeroesApp']);
