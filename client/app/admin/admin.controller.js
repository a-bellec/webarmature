'use strict';

export default class AdminController {

  /*@ngInject*/
  constructor($resource) {
    let User = $resource('/api/users/role/:role', {
      role: '@role'
    }, {
      get: {
        method: 'GET'
      }
    });

    this.users = {};
    this.users.admins = User.query({role: 'admin'});
    this.users.users = User.query({role: 'user'});
    this.users.pending = User.query({role: 'pending'});
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
