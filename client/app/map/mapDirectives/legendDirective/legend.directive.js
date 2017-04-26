'use strict';
const angular = require('angular');
const L = require('leaflet');
const d3 = require('d3');

export default angular.module('webarmatureApp.legend', [])
  .directive('legend', function () {
    return {
      restrict: 'E',
      transclude: true,
      template: require('./legend.html'),
      controller: 'legendController'
    };
  })
  .controller('legendController', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.addLegend = function(legendContent){

      //remove svg to draw new chart
      d3.select(`#${$scope.chartId}legend g`).remove();

      let height = 200;
      let width = 130;

      var color = d3.scaleOrdinal()
        .domain(legendContent.text)
        .range(legendContent.color);

      var svg = d3.select(`#${$scope.chartId}legend`)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(10,${height / 2})`);

      var legendRectSize = 18;
      var legendSpacing = 4;

      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('transform', function(d, i) {
          var rectHeight = legendRectSize + legendSpacing;
          var offset = rectHeight * (color.range().length) / 2;
          var horz = width / 2 + 10;
          var vert = i * rectHeight - offset;
          return `translate(0,${vert})`;
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke-width', '1px')
        .style('stroke', 'black');

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) {
          return d;
        });

      $scope.showLegend = true;
      $scope.$apply();

    };

  }])
  .name;
