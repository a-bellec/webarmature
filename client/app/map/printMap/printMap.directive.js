'use strict';
const angular = require('angular');
import "./printMap";

export default angular.module('webarmatureApp.printMap', [])
  .directive('printMap', function () {

    return {
      restrict: 'EA',
      template: require('./printMap.html'),
      controller: 'printMapController'
    }
  })
  .controller('printMapController', ['$scope', '$timeout', function($scope, $timeout){

    $scope.printMap = function(){

      $scope.loadingPrint = true;

      let print = $("#mapsArea").print({
        noPrintSelector: "sidebar"
      });

      $timeout(function(){
        $scope.loadingPrint = false;
      }, 750);

    };

  }])
  .name;
