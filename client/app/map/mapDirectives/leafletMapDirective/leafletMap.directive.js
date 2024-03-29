'use strict';
const angular = require('angular');
const L = require('leaflet');
require('leaflet.sync');

import statArea from '../statAreaDirective/statArea.directive';
import sidebar from '../sidebarDirective/sidebar.directive';
import tour from '../tourDirective/tour.directive';
import printMap from '../printMapDirective/printMap.directive';
import legend from '../legendDirective/legend.directive';

import _MapInfo from '../../../../components/mapInfo/mapInfo.module';

import leafletMapController from './leafletMap.controller';

export default angular.module('webarmatureApp.leafletMap', [statArea, sidebar, tour, printMap, legend, _MapInfo])
  .directive('leafletMap', function() {
    function link(scope, element) {
      let defaultMapConfig = {
        center: [45.7604276, 4.8335709],
        zoom: 16,
        maxZoom: 18,
        minZoom: 11
      };

      scope.map = L.map(scope.mapId, defaultMapConfig);
      scope.maps.push(scope.map);

      scope.syncMaps();

      scope.map.zoomControl.setPosition('topright');

      scope.OSMLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });

      scope.map.addLayer(scope.OSMLayer);

    }
    return {
      restrict: 'E',
      scope: {
        maps: '=',
        mapId: '='
      },
      template: require('./leafletMap.html'),
      link,
      controller: leafletMapController
    };
  })
  .name;
