'use strict';

import angular from 'angular';
import MapSimpleController from './mapSimple.controller';
require("bootstrap-switch");

export default angular.module('webarmatureApp.mapSimple', [])
  .controller('MapSimpleController', MapSimpleController)
  .name;
