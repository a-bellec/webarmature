/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    let User = sqldb.User;

    return User.destroy({ where: {} })
      .then(() => User.bulkCreate([{
        provider: 'local',
        name: 'Pending user',
        occupation: 'Pending',
        email: 'pendig@example.com',
        password: 'test'
      }, {
        provider: 'local',
        name: 'Pending user',
        occupation: 'Pending',
        email: 'pendng@example.com',
        password: 'test'
      }, {
        provider: 'local',
        name: 'Pending user',
        occupation: 'Pending',
        email: 'peing@example.com',
        password: 'test'
      }, {
        provider: 'local',
        name: 'Pending user',
        occupation: 'Pending',
        email: 'pening@example.com',
        password: 'test'
      }, {
        provider: 'local',
        name: 'Pending user',
        occupation: 'Pending',
        email: 'peding@example.com',
        password: 'test'
      }, {
        provider: 'local',
        name: 'Pending user',
        occupation: 'Pending',
        email: 'ending@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'user',
        name: 'Normal user',
        occupation: 'Normal user',
        email: 'normal@example.com',
        password: 'normal'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        occupation: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }])
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err)));
  }
}
