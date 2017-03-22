'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('labMenu', {
    url: '/labMenu',
    template: require('./labMenu/labMenu.html'),
    controller: 'LabMenuController',
    controllerAs: 'vm'
  })
    .state('labClassification', {
      url: '/labClassification',
      template: require('./labClassification/labClassification.html'),
      controller: 'LabClassificationController',
      controllerAs: 'vm'
    })
    .state('labGeoportail', {
      url: '/labGeoportail',
      template: require('./labGeoportail/labGeoportail.html'),
      controller: 'LabGeoportailController',
      controllerAs: 'vm'
    })
    .state('labMosaicking', {
      url: '/labMosaicking',
      template: require('./labMosaicking/labMosaicking.html'),
      controller: 'LabMosaickingController',
      controllerAs: 'vm'
    })
    .state('labWebMap', {
      url: '/labWebMap',
      template: require('./labWebMap/labWebMap.html'),
      controller: 'LabWebMapController',
      controllerAs: 'vm'
    });
}
