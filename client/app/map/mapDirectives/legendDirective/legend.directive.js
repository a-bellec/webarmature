'use strict';
const angular = require('angular');
const L = require('leaflet');
const d3 = require('d3');

export default angular.module('webarmatureApp.legend', [])
  .directive('legend', function () {

    return {
      restrict: 'E',
      transclude: true,
      controller: 'legendController'
    };
  })
  .controller('legendController', ['$scope', '$timeout', function($scope, $timeout) {
    L.Control.Legend = L.Control.extend({
      onAdd: function (map) {
        return L.DomUtil.create('div', `${$scope.chartId}legendContainer legendContainer`);
      },

      onRemove: function (map) {

      }
    });

    L.control.legend = function (opts) {
      return new L.Control.Legend(opts);
    };

    setTimeout(function () {
      L.control.legend({position: 'topright'}).addTo($scope.map);

      let height = 200;
      let width = 130;

      var color = d3.scaleOrdinal()
        .range(['#006a01', '#00b515', '#e2d920', '#f85402', '#a40005', '#cccfd2']);

      var svg = d3.selectAll(`.${$scope.chartId}legendContainer`)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(10,${height / 2})`);

      var legendRectSize = 18;
      var legendSpacing = 4;

      var legend = svg.selectAll('.legend')
        .data(color.range())
        .enter()
        .append('g')
        .attr('class', 'legend')
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
        .style('font-weight', 'bold')
        .text(function(d, i) {
          if(i == color.range().length -1){
            return "Aucune donnée";
          }
          return `${i * 20}-${i * 20 + 20}%`;
        });

    }, 0);
  }])
  .name;

