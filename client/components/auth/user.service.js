'use strict';

export function UserResource($resource) {
  'ngInject';

  return $resource('/api/users/:id/:controller/:item', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    changeRole:{
      method: 'PUT',
      params: {
        controller: 'role',
        item: '@role'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    delete:{
      method: 'DELETE'
    }
  });
}
