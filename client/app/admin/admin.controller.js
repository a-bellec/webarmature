'use strict';

export default class AdminController {

  /*@ngInject*/
  constructor($scope, $state, User, $q) {

    this.users = {};
    this.users.admins = User.getAllAdmins();
    this.users.users = User.getAllUsers();
    this.users.pending = User.getAllPending();

    $scope.confirm = function(user){
      let changeRolePromise = $q(function(){
        User.changeRole({_id: user._id, role: 'user'});
      });
      changeRolePromise.then($state.reload());
    };

    $scope.delete = function(user){
      let deletePromise = user.$remove();
      deletePromise.then($state.reload());
    }
  }
}
