// main-menu.component.ts (to be identified as renamed...)
import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

import { LoggerService } from '../../core/logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-menu',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './main-menu.component.html',
  styles: ['li {cursor: pointer}']
})

export class MainMenuComponent {
  constructor(private $log: LoggerService, private $location: Location, private router: Router) {
    $log.debug('[MenuCtrl] - INIT.');
  }

  getClass(path) {
    const currentPath = this.$location.path();
    if (path === '' && path !== currentPath) {
      return '';
    }
    return currentPath.substr(0, path.length) === path ? 'active' : '';
  }

  setRoute(route: string) {
    this.$log.debug('[MenuCtrl : setRoute] - Triggered.');
    this.router.navigateByUrl(route);
  }
}
