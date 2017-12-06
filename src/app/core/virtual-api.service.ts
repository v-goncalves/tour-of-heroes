import { Inject, Injectable } from '@angular/core';

const getHeroesRequestDelay = 1000;
const updateHeroRequestDelay = 1500;
const deleteHeroRequestDelay = 2000;
const listOfHeroNames = ['Mr. Nice', 'Narco', 'Bombasto', 'Celeritas', 'Magneta', 'RubberMan', 'Dynama', 'Dr IQ', 'Magma',
  'Tornado'];

declare var Promise: any;
interface Hero {
  id: number;
  name: string;
}

@Injectable()
export class ApiService {
  private heroIdCounter: number;
  private listOfHeroes: Hero[];

  constructor(@Inject('$log') private $log) {
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(this.listOfHeroes)));
      }, getHeroesRequestDelay);
    });
  }

  updateHero(heroToUpdate: Hero) {
    this.$log.debug('[ApiService : updateHero] - Triggered.');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (heroToUpdate && heroToUpdate.id && !isNaN(heroToUpdate.id)) {
          const index = this.getIndexOfHeroesListFromHeroId(heroToUpdate.id);
          if (index < 0) {
            this.$log.error('[ApiService : updateHero] - Error: the hero you are trying to update do not existe in \'listOfHeroes\'.');
            reject({error: 'the hero you are trying to update do not existe in \'listOfHeroes\''});
            return;
          }
          this.listOfHeroes[index] = heroToUpdate;
          resolve(this.listOfHeroes[index]);
        }
        else {
          this.$log.error('[ApiService : updateHero] - Error: invalid hero.id!');
          reject({error: 'invalid hero.id'});
        }
      }, updateHeroRequestDelay);
    });
  }

  deleteHero(heroToDelete: Hero) {
    this.$log.debug('[ApiService : deleteHero] - Triggered.');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (heroToDelete && heroToDelete.id && Number.isInteger(heroToDelete.id)) {
          const index = this.getIndexOfHeroesListFromHeroId(heroToDelete.id);
          if (index < 0) {
            this.$log.error('[ApiService : deleteHero] - Error: the hero you are trying to remove do not existe in \'listOfHeroes\'.');
            reject({error: 'the hero you are trying to remove do not existe in \'listOfHeroes\''});
            return;
          }
          this.listOfHeroes.splice(index, 1);
          resolve();
        }
        else {
          this.$log.error('[ApiService : deleteHero] - Error: invalid hero.id!');
          reject({error: 'invalid hero.id'});
        }
      }, deleteHeroRequestDelay);
    });
  }
  // addHero(hero) {
  //   this.$log.debug('[ApiService : addHero] - Triggered.');
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (hero && hero.name) {
  //         this.listOfHeroes.push({id: this.heroIdCounter++, name: hero.name});
  //         resolve();
  //       }
  //       else {
  //         this.$log.error('[ApiService : addHero] - Error: invalid hero!');
  //         reject({error: 'invalid hero'});
  //       }
  //     }, getHeroesRequestDelay);
  //   });
  // }
}
