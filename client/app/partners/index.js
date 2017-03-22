'use strict';

import angular from 'angular';
import routes from './partners.routes';
import PartnersController from './partners.controller';

export default angular.module('webarmatureApp.partners', ['ui.router'])
  .config(routes)
  .controller('PartnersController', PartnersController)
  .name;
