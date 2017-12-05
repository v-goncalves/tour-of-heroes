const DashboardCtrlDependencies = ['$log', '$location', 'heroService'];

export class DashboardCtrl {
  loading: boolean;
  heroes;
  topHeroes;
  search: string;

  constructor(private $log, private $location, private heroService) {
    $log.debug('[DashboardCtrl] - INIT.');
    const topN = 4;

    // exposed vars
    this.loading = true;
    this.heroes = [];
    this.topHeroes = [];
    this.search = '';

    // execution - get heroes
    heroService.get()
      .then((heroes) => {
        this.loading = false;
        this.heroes = heroes;
        this.topHeroes = (this.heroes && this.heroes.length > topN) ? this.heroes.slice(0, topN) : this.heroes;
      })
      .catch(this.errorPopUp);
  }

  // private methods
  private errorPopUp(e) {
    window.alert('Error connecting the server!\nDetails: ' + (typeof e === 'object' ? JSON.stringify(e) : e));
  }

  containsSearchString(name: string) {
    return typeof this.search === 'string' && typeof name === 'string' && name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
  }

  // exposed methods
  goToHeroDetail(hero) {
    this.$log.debug('[DashboardCtrl  : goToHeroDetail] - Triggered.');
    if (hero && hero.id) {
      this.$log.debug('[DashboardCtrl  : goToHeroDetail] - Going to hero detais, id =' + hero.id + '.');
      this.$location.path('/heroes/' + hero.id);
    }
    else {
      this.$log.debug('[DashboardCtrl  : goToHeroDetail] - Error: \'hero.id\' do not exist.');
    }
  }
}

DashboardCtrl.$inject = DashboardCtrlDependencies;

export const DashboardComponent = {
  controller: DashboardCtrl,
  controllerAs: 'vm',
  templateUrl: '../views/dashboard.component.html'
};
