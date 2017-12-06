// main-menu.component.ts (to be identified as renamed...)
const MenuCtrlDependencies = ['$log', '$location'];

export class MainMenuCtrl {
  constructor(private $log, private $location) {
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

MainMenuCtrl.$inject = MenuCtrlDependencies;

export const MainMenuComponent = {
  controller: MainMenuCtrl,
  controllerAs: 'vm',
  templateUrl: '../views/main-menu.component.html'
};
