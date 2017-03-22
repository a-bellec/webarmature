'use strict';

import angular from 'angular';
import LabMenuController from './labMenu.controller';

export default angular.module('webarmatureApp.labMenu', [])
  .controller('LabMenuController', LabMenuController)
  .name;
