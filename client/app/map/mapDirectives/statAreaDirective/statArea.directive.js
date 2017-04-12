'use strict';
const angular = require('angular');
const d3 = require('d3');

export default angular.module('webarmatureApp.statArea', [])
  .directive('statArea', function () {

    return {
      restrict: 'EA',
      transclude: true,
      template: require('./statArea.html'),
      controller: 'statAreaController'
    }
  })
  .controller('statAreaController', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.printChart = function(dataset){

      //remove svg to draw new chart
      d3.selectAll("#" + $scope.chartId + "SVG").remove();

      var height = $("stat-area").height();
      var width = $("stat-area").width();
      var radius = Math.min(width, height) / 2;

      var color = d3.scaleOrdinal(d3.schemeCategory20b);

      var svg = d3.select('#' + $scope.chartId)
        .append('svg')
        .attr('id', $scope.chartId + "SVG")
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      var pie = d3.pie()
        .value(function(d) { return d.count; })
        .sort(null);

      var path = svg.selectAll('path')
        .data(pie($scope.dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
          return color(d.data.label);
        });
    };

    $scope.$watch('dataset', function(){
      if(typeof $scope.dataset != "undefined"){
        $scope.printChart();
      }
    });

    /*$timeout( function(){
      $scope.dataset = [
        { label: 'Abulia', count: 10 },
        { label: 'Betelgeuse', count: 20 },
        { label: 'Cantaloupe', count: 30 },
        { label: 'Dijkstra', count: 40 }
      ];
    }, 2000);

    $timeout( function(){
      $scope.dataset = [
        { label: 'Abulia', count: 5 },
        { label: 'Betelgeuse', count: 5 },
        { label: 'Cantaloupe', count: 5 },
        { label: 'Dijkstra', count: 85 }
      ];
    }, 4000);*/

  }])
  .name;

