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
  .controller('printMapController', ['$scope', '$timeout', '$window', function($scope, $timeout, $window) {
    //$scope.loadingPrint = false;

    $scope.printMap = function() {
      $scope.loadingPrint = true;

      let printShown = function() {
        //Hack to make sure you can change the value
        $timeout(function() {
          $scope.loadingPrint = false;
        }, 0);
      };

      /*
        The map view to print is ajusted by the ratio of the height/width of the map to prevent overflow.
        Therefore we need to ajust the top property to be a percentage of that ratio.
        This make the elements that are overlaid (stat, legend, attribution) under the map.
       */
      let map = $('leaflet-map');
      let mapsArea = $('#mapsArea');
      let legend = $('legend');
      let statArea = $('#chartBlock');
      let leafletControl = $('.leaflet-control');

      let legendTop = legend.css('top');
      let statAreaTop = statArea.css('top');

      legend.css('top', '125%');
      statArea.css('top', '210%');
      statArea.css('left', (legend.width()+10)+'px' );

      //Container need to be high enough for mapDouble
      leafletControl.addClass('no-print');

      mapsArea.print({
        deferred: $.Deferred().done(printShown),
        //After one minute it's going to print whatever it has been able to load. Otherwise load as soon as ready
        timeout: 60000
      });

      legend.css('top', legendTop);
      statArea.css('top', statAreaTop);
      mapsArea.height(0);
      leafletControl.removeClass('no-print');

    };

  }])
  .name;
