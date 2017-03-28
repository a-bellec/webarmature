'use strict';

export default class AdminController {

  /*@ngInject*/
  constructor($scope, $state, User) {

    this.users = {};
    this.users.admins = User.getAllAdmins();
    this.users.users = User.getAllUsers();
    this.users.pending = User.getAllPending();

    /*$scope.delete = function (user) {
      User.delete({id: user._id});
      $state.reload();
    };*/


    $scope.confirm = function (user) {
      User.changeRole({_id: user._id, role: 'user'});
      $state.reload();
    };
  }

  delete(user, userArray) {
    user.$remove();
    userArray.splice(userArray.indexOf(user), 1);
  };

}
