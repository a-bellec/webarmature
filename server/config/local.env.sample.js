'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'webarmature-secret',
  DB_ADMIN_EMAIL: 'admin_email_here',
  DB_ADMIN_PASSWORD: 'admin_password_here',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
