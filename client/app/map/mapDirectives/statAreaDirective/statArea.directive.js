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
  .controller('statAreaController', ['$scope', function ($scope) {

    $scope.printChart = function(dataset){

      //remove svg to draw new chart
      d3.select("#" + $scope.chartId + "SVG").remove();

      var height = $("stat-area").height();
      var width = height;
      var radius = Math.min(width, height) / 2;

      var color = d3.scaleOrdinal()
        .domain(["darkGreen", "lightGreen", "yellow", "orange", "red"])
        .range(["#006a01", "#00b515" , "#e2d920", "#f85402", "#a40005"]);

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
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
          return color(d.data.label);
        });
    };

    $scope.$watch('dataset.impermeable', function(){
      if(typeof $scope.dataset.impermeable != "undefined"){
        $scope.printChart($scope.dataset.impermeable);
      }
    });

    $scope.dataset = {};

  }])
  .name;

