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
    };
  })
  .controller('statAreaController', ['$scope', function ($scope) {

    let createPieChart = function (svg, dataset, radius, color) {

      var arc = d3.arc()
        .innerRadius(radius / 2)
        .outerRadius(radius);

      var pie = d3.pie()
        .value(function (d) {
          return d.count;
        })
        .sort(null);

      function tweenPie(b) {
        b.innerRadius = 0;
        var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
        return function (t) {
          return arc(i(t));
        };
      }

      var grads = svg.append("defs").selectAll("radialGradient").data(pie(dataset))
        .enter().append("radialGradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "40%")
        .attr("fx", "50%")
        .attr("fy", "50%")
        .attr("gradientTransform", "translate(-" + 175 + ",-" + 125 + ")")
        .attr("id", function (d, i) {
          return "grad" + i;
        });
      grads.append("stop").attr("offset", "0%").style("stop-color", "black");
      grads.append("stop").attr("offset", "50%").style("stop-color", function (d, i) {
        return color(i);
      });
      grads.append("stop").attr("offset", "100%").style("stop-color", "black");


      let oldPath = {};
      if(typeof $scope.dataset.impermeableOld !== "undefined"){
        oldPath = svg.selectAll('path')
          .data(pie($scope.dataset.impermeableOld))
          .enter();
      }

      svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr("fill", function (d, i) {
          return "url(#grad" + i + ")";
        })
        .style('stroke-width', '1px')
        .style('stroke', '#FFFFFF')
        .style('stroke-opacity', '0.5')
        .transition().duration(750)
        .attrTween("d", function (d, i) {
          this._current = d;
          if(typeof oldPath._groups !== "undefined"){
            this._current = oldPath._groups[0][i].__data__
          }
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function (t) {
            return arc(interpolate(t));
          };
        });

    };

    let addLegend = function (svg, color, dataset) {
      var legendRectSize = 18;
      var legendSpacing = 4;

      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
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
        .text(function (d, i) {
          return `${i * 20}-${i * 20 + 20}% : `;
        });

      legend.append('text')
        .data(dataset)
        .attr('x', legendRectSize + legendSpacing + 58)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) {
          return `${d.count}%`;
        });

      let legendTotal = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', function () {
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

    let addTitle = function (svg, width, height) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', 0 - height / 2 - 5)
        .attr('text-anchor', 'end')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .text('Pourcentage d\'imperméabilisation');
    };

    $scope.printChart = function (dataset) {
      //remove svg to draw new chart
      d3.select(`#${$scope.mapId}chart g`).remove();

      var height = $('stat-area').height() * 0.9;
      var width = 350;
      var radius = Math.min(width, height) / 2;
      var margin = {top: 40, bottom: 45};

      //chart color	  
      var color = d3.scaleOrdinal()
        .range(['#1a9641', '#a6d96a', '#ffffbf', '#fdae61', '#d7191c']);

      $scope.svg = d3.select(`#${$scope.mapId}chart`)
        .attr('width', width)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${width / 2 - 75},${(height + margin.top) / 2})`);

      createPieChart($scope.svg, dataset, radius, color);

      addLegend($scope.svg, color, dataset);

      addTitle($scope.svg, width, height);

      $scope.showStat = true;
    };

    $scope.$watch('dataset.impermeable', function () {
      if (typeof $scope.dataset.impermeable !== 'undefined') {
        $scope.printChart($scope.dataset.impermeable);
      }
    });

    $scope.dataset = {};

  }])
  .name;

