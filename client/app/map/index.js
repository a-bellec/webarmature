'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './map.routes';
import mapMenu from './mapMenu';
import mapSimple from './mapSimple';
import mapDouble from './mapDouble';
import leafletMap from './mapDirectives/leafletMapDirective/leafletMap.directive';
import sidebar from './mapDirectives/sidebarDirective/sidebar.directive';
import tour from './mapDirectives/tourDirective/tour.directive';
import printMap from './mapDirectives/printMapDirective/printMap.directive';

require("bootstrap-switch");
require("leaflet");
require("leaflet-sidebar-v2");
require("leaflet.sync");
require("d3");
require("bootstrap-tour");

export default angular.module('webarmatureApp.map', [uiRouter, mapMenu, mapSimple, mapDouble, leafletMap, sidebar, tour, printMap])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';
  })
  .name;
