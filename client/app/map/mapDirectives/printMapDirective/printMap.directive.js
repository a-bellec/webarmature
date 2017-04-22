'use strict';
const angular = require('angular');
require('jQuery.print');

export default angular.module('webarmatureApp.printMap', [])
  .directive('printMap', function() {
    return {
      restrict: 'EA',
      template: require('./printMap.html'),
      controller: 'printMapController'
    };
  })
  .controller('printMapController', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.loadingPrint = false;

    $scope.printMap = function() {
      $scope.loadingPrint = true;

      let printShown = function() {
        //Hack to make sure you can change the value
        $timeout(function() {
          $scope.loadingPrint = false;
        }, 0);
      };

      let print = $('#mapsArea').print({
        noPrintSelector: 'sidebar',
        deferred: $.Deferred().done(printShown),
        //After one minute it's going to print whatever it has been able to load. Otherwise load as soon as ready
        timeout: 60000
      });
    };
  }])
  .name;
