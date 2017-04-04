'use strict';

import angular from 'angular';

import {
  MailService
} from './mail.service';

import uiRouter from 'angular-ui-router';

export default angular.module('webarmatureApp.mail', [uiRouter])
  .factory('Mail', MailService)
  .name;
