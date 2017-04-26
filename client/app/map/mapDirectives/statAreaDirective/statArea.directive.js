'use strict';
const angular = require('angular');
const d3 = require('d3');

export default angular.module('webarmatureApp.statArea', [])
  .directive('statArea', function() {
    return {
      restrict: 'EA',
      transclude: true,
      template: require('./statArea.html'),
      controller: 'statAreaController'
    };
  })
  .controller('statAreaController', ['$scope', function($scope) {

    let createPieChart = function(svg, dataset, radius, color){
      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      var pie = d3.pie()
        .value(function(d) {
          return d.count;
        })
        .sort(null);

      svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d) {
          return color(d.data.label);
        });
    };

    let addLegend = function(svg, color, dataset){
      var legendRectSize = 18;
      var legendSpacing = 4;

      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
          var rectHeight = legendRectSize + legendSpacing;
          var offset = rectHeight * (color.domain().length + 1) / 2;
          var horz = $('stat-area').height() / 2 + 10;
          var vert = i * rectHeight - offset;
          return `translate(${horz},${vert})`;
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke-width', '1px')
        .style('stroke', 'black');

      legend.append('text')
        .data(dataset)
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .style('font-weight', 'bold')
        .text(function(d, i) {
          return `${i * 20}-${i * 20 + 20}% : `;
        });

      legend.append('text')
        .data(dataset)
        .attr('x', legendRectSize + legendSpacing + 58)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) {
          return `${d.count}%`;
        });

      let legendTotal = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', function() {
          var rectHeight = legendRectSize + legendSpacing;
          var offset = rectHeight * (color.domain().length + 1) / 2;
          var horz = $('stat-area').height() / 2 + 10;
          var vert = 5 * rectHeight - offset;
          return `translate(${horz},${vert})`;
        });

      legendTotal.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .style('font-weight', 'bold')
        .text('% total: ');
      legendTotal.append('text')
        .attr('x', legendRectSize + legendSpacing + 58)
        .attr('y', legendRectSize - legendSpacing)
        .text(`${$scope.dataAverage}%`);
    };

    let addTitle = function(svg, width, height){
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', 0 - height / 2 - 5)
        .attr('text-anchor', 'end')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .text('Pourcentage d\'imperméabilisation');
    };

    $scope.printChart = function(dataset) {
      //remove svg to draw new chart
      d3.select(`#${$scope.chartId} g`).remove();

      var height = $('stat-area').height() * 0.9;
      var width = 350;
      var radius = Math.min(width, height) / 2;
      var margin = {top: 40, bottom: 45};

      var color = d3.scaleOrdinal()
        .range(['#006a01', '#00b515', '#e2d920', '#f85402', '#a40005']);

      var svg = d3.select(`#${$scope.chartId}`)
        .attr('width', width)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${width / 2 - 75},${(height+margin.top) / 2})`);

      createPieChart(svg, dataset, radius, color);

      addLegend(svg, color, dataset);

      addTitle(svg, width, height);

      $scope.showStat = true;
    };

    $scope.$watch('dataset.impermeable', function() {
      if(typeof $scope.dataset.impermeable !== 'undefined') {
        $scope.printChart($scope.dataset.impermeable);
      }
    });

    $scope.dataset = {};

  }])
  .name;

