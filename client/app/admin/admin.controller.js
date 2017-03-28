'use strict';

export default class AdminController {

  /*@ngInject*/
  constructor($resource) {
    let User = $resource('/api/users/admin', {
      get: {
        method: 'GET'
      }
    });

    this.users = User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
