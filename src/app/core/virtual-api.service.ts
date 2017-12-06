import { Inject, Injectable } from '@angular/core';

const getHeroesRequestDelay = 1000;
const updateHeroRequestDelay = 1500;
const deleteHeroRequestDelay = 2000;
const listOfHeroNames = ['Mr. Nice', 'Narco', 'Bombasto', 'Celeritas', 'Magneta', 'RubberMan', 'Dynama', 'Dr IQ', 'Magma',
  'Tornado'];

interface Hero {
  id: number;
  name: string;
}

@Injectable()
export class ApiService {
  private heroIdCounter: number;
  private listOfHeroes: Hero[];

  constructor(@Inject('$log') private $log, @Inject('$q') private $q) {
    this.$log.debug('[ApiService] - INIT.');
    this.heroIdCounter = 10;
    this.listOfHeroes = [];

    // build local Database
    listOfHeroNames.forEach((element) => {
      this.listOfHeroes.push({id: this.heroIdCounter++, name: element});
    });
  }

  private getIndexOfHeroesListFromHeroId(idToFind: number) {
    let index = -1;
    this.listOfHeroes.forEach((hero, i) => {
      if (hero.id === idToFind) {
        index = i;
      }
    });
    return index;
  }

  getHeroes() {
    this.$log.debug('[ApiService : getHeroes] - Triggered.');
    const deferred = this.$q.defer();
    setTimeout(() => {
      deferred.resolve(JSON.parse(JSON.stringify(this.listOfHeroes)));
    }, getHeroesRequestDelay);
    return deferred.promise;
  }

  updateHero(heroToUpdate: Hero) {
    this.$log.debug('[ApiService : updateHero] - Triggered.');
    const deferred = this.$q.defer();
    setTimeout(() => {
      if (heroToUpdate && heroToUpdate.id && !isNaN(heroToUpdate.id)) {
        const index = this.getIndexOfHeroesListFromHeroId(heroToUpdate.id);
        if (index < 0) {
          this.$log.error('[ApiService : updateHero] - Error: the hero you are trying to update do not existe in \'listOfHeroes\'.');
          deferred.reject({error: 'the hero you are trying to update do not existe in \'listOfHeroes\''});
          return deferred.promise;
        }
        this.listOfHeroes[index] = heroToUpdate;
        deferred.resolve(this.listOfHeroes[index]);
      }
      else {
        this.$log.error('[ApiService : updateHero] - Error: invalid hero.id!');
        deferred.reject({error: 'invalid hero.id'});
      }
    }, updateHeroRequestDelay);
    return deferred.promise;
  }

  deleteHero(heroToDelete: Hero) {
    this.$log.debug('[ApiService : deleteHero] - Triggered.');
    const deferred = this.$q.defer();
    setTimeout(() => {
      if (heroToDelete && heroToDelete.id && Number.isInteger(heroToDelete.id)) {
        const index = this.getIndexOfHeroesListFromHeroId(heroToDelete.id);
        if (index < 0) {
          this.$log.error('[ApiService : deleteHero] - Error: the hero you are trying to remove do not existe in \'listOfHeroes\'.');
          deferred.reject({error: 'the hero you are trying to remove do not existe in \'listOfHeroes\''});
          return deferred.promise;
        }
        this.listOfHeroes.splice(index, 1);
        deferred.resolve();
      }
      else {
        this.$log.error('[ApiService : deleteHero] - Error: invalid hero.id!');
        deferred.reject({error: 'invalid hero.id'});
      }
    }, deleteHeroRequestDelay);
    return deferred.promise;
  }
  // addHero(hero) {
  //   this.$log.debug('[ApiService : addHero] - Triggered.');
  //   const deferred = this.$q.defer();
  //   setTimeout(() => {
  //     if (hero && hero.name) {
  //       this.listOfHeroes.push({id: this.heroIdCounter++, name: hero.name});
  //       deferred.resolve();
  //     }
  //     else {
  //       this.$log.error('[ApiService : addHero] - Error: invalid hero!');
  //       deferred.reject({error: 'invalid hero'});
  //     }
  //   }, getHeroesRequestDelay);
  //   return deferred.promise;
  // }
}
