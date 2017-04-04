'use strict';

import angular from 'angular';

export class NavbarComponent {

  message = {
    name: "",
    email: "",
    messsage: ""
  };
  submitted = false;

  constructor(Auth, $scope) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $("#about-btn").click(function() {
      $("#aboutModal").modal("show");
      $(".navbar-collapse.in").collapse("hide");
    });

  }

  sendMail(form){
    console.log(1);
    this.submitted = true;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
