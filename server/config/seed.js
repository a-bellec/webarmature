/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import config from './environment/';
import localenv from './local.env.js';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    let User = sqldb.User;

    return User.destroy({ where: {} })
      .then(() => User.bulkCreate([{
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        occupation: 'Admin',
        occupationPlace: 'Admin',
        email: localenv.DB_ADMIN_EMAIL,
        password: localenv.DB_ADMIN_PASSWORD
      }])
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err)));
  }
}
