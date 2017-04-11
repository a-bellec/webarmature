'use strict';
const angular = require('angular');

export default angular.module('webarmatureApp.statArea', [])
  .directive('statArea', function () {

    return {
      restrict: 'EA',
      template: require('./statArea.html'),
      controller: 'statAreaController'
    }
  })
  .controller('statAreaController', ['$scope', function($scope){

  }])
  .name;

