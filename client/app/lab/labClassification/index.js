'use strict';

import angular from 'angular';
import LabClassificationController from './labClassification.controller';

export default angular.module('webarmatureApp.labClassification', [])
  .controller('LabClassificationController', LabClassificationController)
  .name;
