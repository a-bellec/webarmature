'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './lab.routes';
import labClassification from './labClassification';
import labGeoportail from './labGeoportail';
import labMenu from './labMenu';
import labMosaicking from './labMosaicking';
import labWebmap from './labWebMap';

export default angular.module('webarmatureApp.lab', [uiRouter, labClassification, labGeoportail, labMenu, labMosaicking, labWebmap])
  .config(routing)
  .run(function() {
    'ngInject';
  })
  .name;
