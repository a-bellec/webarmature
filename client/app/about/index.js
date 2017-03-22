'use strict';

import angular from 'angular';
import routes from './about.routes';
import AboutController from './about.controller';

export default angular.module('webarmatureApp.about', ['ui.router'])
  .config(routes)
  .controller('AboutController', AboutController)
  .name;
