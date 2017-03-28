'use strict';

export default class AdminController {

  /*@ngInject*/
  constructor(User) {
    this.users = User.query();

  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
