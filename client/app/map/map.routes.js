'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('mapMenu', {
    url: '/mapMenu',
    template: require('./mapMenu/mapMenu.html'),
    controller: 'MapMenuController',
    controllerAs: 'vm'
  })
    .state('mapSimple', {
      url: '/mapSimple',
      template: require('./mapSimple/mapSimple.html'),
      controller: 'MapSimpleController',
      controllerAs: 'vm'
    })
    .state('mapDouble', {
      url: '/mapDouble',
      template: require('./mapDouble/mapDouble.html'),
      controller: 'MapDoubleController',
      controllerAs: 'vm'
    });
}
