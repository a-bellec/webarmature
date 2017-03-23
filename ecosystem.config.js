module.exports = {

  apps : [

    // First application
    {
      name      : "webarmature",
      script    : "dist/server/index.js",
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  deploy : {
    production : {
      user : "node",
      host : "www.webarmature.fr",
      ref  : "origin/master",
      repo : "git@github.com:abellec29/webarmature.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && gulp build && pm2 startOrRestart ecosystem.config.js --env production"
    },
    dev : {
      user : "node",
      host : "www.webarmature.fr",
      ref  : "origin/master",
      repo : "git@github.com:abellec29/webarmature.git",
      path : "/var/www/development",
      "post-deploy" : "npm install && gulp build && pm2 startOrRestart ecosystem.config.js --env dev",
      env  : {
        NODE_ENV: "dev"
      }
    }
  }
};
