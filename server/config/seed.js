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
        email: 'pending@example.com',
        password: 'pending'
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
