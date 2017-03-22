'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('partners', {
    url: '/partners',
    template: require('./partners.html'),
    controller: 'PartnersController',
    controllerAs: 'vm'
  });
}
