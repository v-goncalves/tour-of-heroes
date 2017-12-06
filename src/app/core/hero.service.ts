import { Injectable, Inject } from '@angular/core';

import { ApiService } from './virtual-api.service';

@Injectable()
export class HeroService {
  constructor(@Inject('$log') private $log, private apiService: ApiService) {
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
