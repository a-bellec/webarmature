module.exports = {

  apps: [

    {
      name: 'webarmature',
      script: 'dist/server/index.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]

};
