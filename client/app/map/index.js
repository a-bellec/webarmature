'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './map.routes';
import mapMenu from './mapMenu';
import mapSimple from './mapSimple';
import mapDouble from './mapDouble';
import leafletMap from './mapDirectives/leafletMapDirective/leafletMap.directive';

export default angular.module('webarmatureApp.map', [uiRouter, mapMenu, mapSimple, mapDouble, leafletMap])
  .config(routing)
  .run(function() {
    'ngInject';
  })
  .name;
