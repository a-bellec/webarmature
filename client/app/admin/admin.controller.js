'use strict';

export default class AdminController {

  /*@ngInject*/
  constructor($scope, $state, User, $q) {
    this.users = {};
    this.users.admins = User.getAllAdmins();
    this.users.users = User.getAllUsers();
    this.users.pending = User.getAllPending();

    $scope.confirm = function(user) {
      let changeRolePromise = User.changeRole({_id: user._id, role: 'user'});
      changeRolePromise.$promise.then(function() {
        $state.reload();
      });
    };

    $scope.delete = function(user) {
      let deletePromise = User.delete({id: user._id});
      deletePromise.$promise.then(function() {
        $state.reload();
      });
    };
  }
}
