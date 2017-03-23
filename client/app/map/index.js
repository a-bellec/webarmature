'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './map.routes';
import mapMenu from './mapMenu';
import mapSimple from './mapSimple';
import mapDouble from './mapDouble';
import sidebar from './sidebar/sidebar.directive';

require("bootstrap-switch");
require("leaflet");
require("leaflet-sidebar-v2");
require("leaflet.sync");
require("d3");
require("bootstrap-tour");

export default angular.module('webarmatureApp.map', [uiRouter, mapMenu, mapSimple, mapDouble, sidebar])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';
  })
  .name;
