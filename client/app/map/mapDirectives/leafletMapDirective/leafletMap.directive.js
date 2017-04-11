'use strict';
const angular = require('angular');
import "../L.TileLayer.BetterWMS";

export default angular.module('webarmatureApp.leafletMap', [])
  .directive('leafletMap', function () {

    function link(scope, element, attrs) {

      scope.geoServerBaseUrl = 'http://a.map.webarmature.fr/geoserver/wms/';
      let defaultMapConfig = {
        center: [45.7604276, 4.8335709],
        zoom: 16,
        maxZoom: 18,
        minZoom: 13
      };

      let mapId = element.attr("id");

      scope.map = L.map(mapId, defaultMapConfig);
      scope.maps.push(scope.map);

      scope.syncMaps = function(){
        for(let i=0; i < scope.maps.length -1; i++){
          let firstMap = scope.maps[i];
          let secondMap = scope.maps[i+1];
          firstMap.sync(secondMap, {syncCursor: true});
          secondMap.sync(firstMap, {syncCursor: true});
        }
      };

      scope.syncMaps();

      scope.map.zoomControl.setPosition('topright');

      scope.OSMLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });

      scope.map.addLayer(scope.OSMLayer);

      //Close sidebarDirective when clicking outside of it
      $("#mapsArea").click(function (event) {
        if (!$(event.target).closest("#"+scope.sidebarId).length) {
          if (!($("#"+scope.sidebarId).hasClass("collapsed"))) {
            $("#"+scope.sidebarId).addClass("collapsed");
            $("#"+scope.sidebarId).find("li").each(function () {
              $(this).removeClass("active");
            });
            $().addClass("collapsed");
          }
        }
      });
      
      //Add style to accordion button when opening them
      //And remove style from other accordion buttons
      scope.addSelected = function(event){
        if (!(angular.element(event.target).hasClass("selected"))) {
          $(".sidebarButton").each(function () {
            $(this).removeClass("selected");
          });
          angular.element(event.target).addClass("selected");
        }
        else {
          angular.element(event.target).removeClass("selected");
        }
      };

    }
    return {
      restrict: 'E',
      scope: {
        maps: '=',
        sidebarId: '=',
        groupName: '='
      },
      template: require('./leafletMap.html'),
      link: link,
      controller: 'leafletMapController'
    }
  })
  .controller('leafletMapController', ['$scope', function($scope){

    $scope.getTownInfo = function(townName){

      var params = {
        request: 'GetFeature',
        service: 'WFS',
        srs: 'EPSG:2154',
        version: "2.0.0",
        typeNames: "test:towns_border-d2015",
        CQL_Filter: "NOM_COM= '"+townName+"'",
        outputFormat: 'application/json'
      };

      let url = geoServerBaseUrl + L.Util.getParamString(params, geoServerBaseUrl, true);

      $.ajax({
        url: "/api/mapInfo/town",
        data: {
          url: url
        },
        success: function (data) {
          console.log(data);
        }
      });
    };

  }])
  .name;
