'use strict';

import angular from 'angular';

import {
  MapInfoService
} from './mapInfo.service';

import uiRouter from 'angular-ui-router';

export default angular.module('webarmatureApp.mapInfo', [uiRouter])
  .factory('MapInfo', MapInfoService)
  .name;

