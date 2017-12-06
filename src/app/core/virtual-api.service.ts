export abstract class ApiService {
  getHeroes(): any {}
  updateHero(heroToUpdate: {id: number}): any {}
  deleteHero(heroToDelete: {id: number}): any {}
}

export function ApiServiceFactory(i: any) {
  return i.get('apiService');
}

export const apiServiceProvider = {
  provide: ApiService,
  useFactory: ApiServiceFactory,
  deps: ['$injector']
};
