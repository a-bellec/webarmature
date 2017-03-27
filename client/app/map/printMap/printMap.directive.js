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

    $scope.loadingPrint = false;

    $scope.printMap = function(){

      $scope.loadingPrint = true;

      let printShown = function() {
        //Fix to properly be able to change value
        $timeout(function(){ $scope.loadingPrint = false;}, 0);
      };

      let print = $("#mapsArea").print({
        noPrintSelector: "sidebar",
        deferred: $.Deferred().done(printShown)
      });

    };

  }])
  .name;
