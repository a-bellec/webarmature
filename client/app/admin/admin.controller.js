'use strict';

export default class AdminController {

  /*@ngInject*/
  constructor($resource, $scope, $state, User) {

    let UserRole = $resource('/api/users/role/:role', {
      role: '@role'
    }, {
      get: {
        method: 'GET'
      }
    });

    this.users = {};
    this.users.admins = UserRole.query({role: 'admin'});
    this.users.users = UserRole.query({role: 'user'});
    this.users.pending = UserRole.query({role: 'pending'});

    $scope.delete = function(user){
      User.delete({id: user._id});
      $state.reload();
    }
  }

}
