// main-menu.component.ts (to be identified as renamed...)
import { Component, Inject, ViewEncapsulation } from '@angular/core';

import { LoggerService } from '../../core/logger.service';

@Component({
  selector: 'main-menu',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './main-menu.component.html'
})

export class MainMenuComponent {
  constructor(private $log: LoggerService, @Inject('$location') private $location) {
    $log.debug('[MenuCtrl] - INIT.');
  }

  getClass(path) {
    const currentPath = this.$location.path();
    if (path === '/' && path !== currentPath) {
      return '';
    }
    return currentPath.substr(0, path.length) === path ? 'active' : '';
  }
}
