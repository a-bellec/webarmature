'use strict';
const angular = require('angular');

export default angular.module('webarmatureApp.printMap', [])
  .directive('printMap', function ($timeout) {

    function link(scope, element, attrs) {
      
      scope.printMap = function(){

        //Magic number. Bad. Wait for leaflet to be loaded before showing print
        let timeBeforeShowingPrint = 5000;

        scope.loadingPrint = true;
        $("#mapsArea").print({
          timeout: timeBeforeShowingPrint,
          noPrintSelector: "sidebar"
        });

        $timeout( function(){
          scope.loadingPrint = false;
        }, timeBeforeShowingPrint);

      };

      scope.$on('$destroy', function() {

      });

    }

    return {
      restrict: 'EA',
      scope: {},
      template: require('./printMap.html'),
      link: link,
      controller: 'printMapController'
    }
  })
  .controller('printMapController', ['$scope', function($scope){

  }])
  .name;
