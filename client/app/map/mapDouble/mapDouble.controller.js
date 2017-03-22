'use strict';

import angular from 'angular';

export default class MapDoubleController {

  /*@ngInject*/
  constructor($scope) {
    $scope.groupLeftName = "leftGroup";
    $scope.groupRightName = "rightGroup";

    $scope.maps = [];
  }

  $onInit() {

  }

}
