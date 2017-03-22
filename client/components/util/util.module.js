'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('webarmatureApp.util', [])
  .factory('Util', UtilService)
  .name;
