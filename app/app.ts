// tourOfHeroesApp - application main module.

import { AppRootComponent } from './app-root.component.js';
import { MainMenuComponent } from './main-menu/main-menu.component.js';
import { DashboardComponent } from './dashboard/dashboard.component.js';
import { HeroesComponent } from './heroes/heroes.component.js';
import { ApiServiceFactory } from './core/virtual-api-service.js';
import { HeroServiceFactory } from './core/hero-service.js';


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
