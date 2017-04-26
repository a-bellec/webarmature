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
      d3.select(`#${$scope.mapId}legend g`).remove();

      let height = $('legend').height();
      let width = $('legend').width();

      var color = d3.scaleOrdinal()
        .domain(legendContent.text)
        .range(legendContent.color);

      var svg = d3.select(`#${$scope.mapId}legend`)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(10,${height / 2})`);

      var legendRectSize = 18;
      var legendSpacing = 4;

      let titleWords = legendContent.title.split(' ');

      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('transform', function(d, i) {
          var rectHeight = legendRectSize + legendSpacing;
          var offset = rectHeight * (color.range().length) / 2;
          var vert = i * rectHeight - offset + (10*titleWords.length);
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

      let title = svg.append('text')
        .attr('y', 0 - (height / 2) + 5)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'hanging')
        .style('font-size', '14px')
        .style('font-weight', 'bold');

      for(let i = 0; i < titleWords.length; i++){
        title.append('tspan')
          .attr('x', (width / 2) - 10)
          .attr('dy', '1.2em')
          .text(titleWords[i]);
      }

      $scope.showLegend = true;
      $scope.$apply();

    };

  }])
  .name;

