'use strict';

import angular from 'angular';

export class NavbarComponent {

  message = {
    name: '',
    email: '',
    messsage: ''
  };
  submitted = false;
  successful = false;
  errors = {
    sendMail: undefined
  };

  constructor(Auth, $scope, $http, Mail, $location) {
    'ngInject';

    this.Mail = Mail;

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $('#about-btn').click(function() {
      $('#aboutModal').modal('show');
      $('.navbar-collapse.in').collapse('hide');
    });

    $scope.$on('$locationChangeStart', function() {
      $('.navbar-collapse.in').collapse('hide');
    });
  }

  sendMail(form) {
    this.submitted = true;

    if(form.$valid) {
      this.valid = true;
      this.Mail.contactMail({
        name: this.message.name,
        email: this.message.email,
        text: this.message.text
      })
        .then(res => {
          if(res.data.yo == 'error') {
            this.errors.sendMail = 'Failed to send your email. Please try again later.';
          } else {
            this.successful = true;
          }
        })
        .catch(err => {
          this.errors.sendMail = err.message;
        });
    }
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
