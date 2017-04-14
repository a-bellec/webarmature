'use strict';
const angular = require('angular');

import statArea from '../statAreaDirective/statArea.directive';
import sidebar from '../sidebarDirective/sidebar.directive';
import tour from '../tourDirective/tour.directive';
import printMap from '../printMapDirective/printMap.directive';

import _MapInfo from '../../../../components/mapInfo/mapInfo.module';

import leafletMapController from './leafletMap.controller';

export default angular.module('webarmatureApp.leafletMap', [statArea, sidebar, tour, printMap, _MapInfo])
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

    }
    return {
      restrict: 'E',
      scope: {
        maps: '=',
        sidebarId: '=',
        chartId: '=',
        groupName: '='
      },
      template: require('./leafletMap.html'),
      link: link,
      controller: leafletMapController
    }
  })
  .name;
