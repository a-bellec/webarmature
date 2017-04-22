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
    changeRole: {
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
    getAllAdmins: {
      method: 'GET',
      isArray: true,
      params: {
        id: 'role',
        controller: 'admin'
      }
    },
    getAllUsers: {
      method: 'GET',
      isArray: true,
      params: {
        id: 'role',
        controller: 'user'
      }
    },
    getAllPending: {
      method: 'GET',
      isArray: true,
      params: {
        id: 'role',
        controller: 'pending'
      }
    },
    delete: {
      method: 'DELETE'
    }
  });
}
