'use strict';

import angular from 'angular';

export default class SignupController {
  user = {
    name: '',
    occupation: '',
    occupationPlace: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;


  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;

    if(form.$valid) {
      return this.Auth.createUser({
        name: this.user.name,
        occupation: this.user.occupation,
        occupationPlace: this.user.occupationPlace,
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          this.formValidated = true;
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the sequelize errors
          if(err.name) {
            angular.forEach(err.fields, (error, field) => {
              form[field].$setValidity('mongoose', false);
              this.errors[field] = err.message;
            });
          }
        });
    }
  }
}
