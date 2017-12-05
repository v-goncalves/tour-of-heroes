const HeroServiceDependencies = ['$log', 'apiService'];
class HeroService {
  constructor(private $log, private apiService) {
    this.$log.debug('[HeroService] - INIT.');
  }

  get() {
    this.$log.debug('[HeroService : get] - Triggered.');
    return this.apiService.getHeroes();
  }
  update(hero) {
    this.$log.debug('[HeroService : update] - Triggered.');
    return this.apiService.updateHero(hero);
  }
  delete(hero) {
    this.$log.debug('[HeroService : delete] - Triggered.');
    return this.apiService.deleteHero(hero);
  }
}

// export const HeroServiceFactory: Injectable = () => new HeroService(...Array.prototype.slice.call(arguments));
export const HeroServiceFactory = ($log, apiService) => new HeroService($log, apiService);
HeroServiceFactory.$inject = HeroServiceDependencies;
