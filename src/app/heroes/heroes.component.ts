import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeroService} from '../core/hero.service';
import { LoggerService } from '../core/logger.service';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes;
  hero;
  private heroId;
  private listOfHeroes;
  private heroIDsWaitForDeletion;

  constructor(private $log: LoggerService, private route: ActivatedRoute,
              private heroService: HeroService) {
    $log.debug('[HeroesComponent] - INIT.');
    this.heroes = [];
    this.hero = null;

    route.params.subscribe((params) => {
      this.heroId = params && params.heroId ? Number(params.heroId) : null;
      this.getHeroesFromServer();
    });
    this.heroIDsWaitForDeletion = [];
  }

  private errorPopUp(e) {
    window.alert('Error connecting the server!\nDetails: ' + (typeof e === 'object' ? JSON.stringify(e) : e));
  }

  private getIndexOfHeroesListFromHeroId(idToFind) {
    let index = -1;
    this.listOfHeroes.forEach((hero, i) => {
      if (hero.id === idToFind) {
        index = i;
      }
    });
    return index;
  }

  private onSuccessGettingHeroesList(heroes) {
    this.listOfHeroes = heroes;
    if (!this.heroId) {
      this.heroes = this.listOfHeroes;
    }
    else {
      const index = this.getIndexOfHeroesListFromHeroId(this.heroId);
      if (index < 0) {
        this.$log.error('[HeroesCtrl] - Error: no hero for the url parm \'heroId\'.');
        return;
      }
      this.hero = this.listOfHeroes[index];
    }
  }

  private getHeroesFromServer() {
    this.$log.debug('[HeroesCtrl : getHeroesFromServer] - Triggered.');
    this.heroService.get()
      .then((data) => this.onSuccessGettingHeroesList(data))
      .catch(this.errorPopUp);
  }

  isInDeletingList(hero) {
    this.$log.debug('[HeroesCtrl : isInDeletingList] - Triggered.');
    return this.heroIDsWaitForDeletion.indexOf(hero.id) > -1;
  }
  deleteHero(hero) {
    this.$log.debug('[HeroesCtrl : deleteHero] - Triggered.');
    this.heroIDsWaitForDeletion.push(hero.id);
    this.heroService.delete(hero)
      .then(() => {
        this.getHeroesFromServer();
      })
      .catch(this.errorPopUp);
  }
  saveHero(hero) {
    this.$log.debug('[HeroesCtrl : saveHero] - Triggered.');
    this.heroService.update(hero)
      .then((_hero) => {
        this.hero = _hero;
      })
      .catch(this.errorPopUp);
  }
  goBack() {
    this.$log.debug('[HeroesCtrl : goBack] - Triggered.');
    window.history.back();
  }
}
