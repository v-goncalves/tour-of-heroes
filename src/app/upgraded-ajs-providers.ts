// $log
export function $logFactory(i: any) { return i.get('$log'); }
const $logProvider = { provide: '$log', useFactory: $logFactory, deps: ['$injector'] };

// $location
export function $locationFactory(i: any) { return i.get('$location'); }
const $locationProvider = { provide: '$location', useFactory: $locationFactory, deps: ['$injector'] };

// $route
export function $routeFactory(i: any) { return i.get('$route'); }
const $routeProvider = { provide: '$route', useFactory: $routeFactory, deps: ['$injector'] };

// $routeParams
export function $routeParamsFactory(i: any) { return i.get('$routeParams'); }
const $routeParamsProvider = { provide: '$routeParams', useFactory: $routeParamsFactory, deps: ['$injector'] };

export const upgradedAjsProviders = [
  // Upgraded AngularJS built-in services
  $logProvider,
  $locationProvider,
  $routeProvider,
  $routeParamsProvider
];
