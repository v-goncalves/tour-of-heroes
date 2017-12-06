export abstract class HeroService {
  get(): any {}
  update(hero): any {}
  delete(hero): any {}
}

export function HeroServiceFactory(i: any) {
  return i.get('heroService');
}

export const heroServiceProvider = {
  provide: HeroService,
  useFactory: HeroServiceFactory,
  deps: ['$injector']
};
