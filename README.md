# webarmature

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.1.4.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [SQLite](https://www.sqlite.org/quickstart.html)
- [Node-gyp](https://github.com/nodejs/node-gyp)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

### Production

#### Production environment variables

The seed for the database use two environment variables to create the first admin account. You have to set them up to be able to use the admin account. They will be used to log in with the admin account.

You have to set them up in `/server/config/local.env.js`. Look at `/server/config/local.env.sample.js` for an example on how to set up those variables

These are the variables you have to set up: `DB_ADMIN_EMAIL` and `DB_ADMIN_PASSWORD`

#### Build dist project

1. Run `npm install` to install server dependencies.

2. Run `gulp build` to build the project with minified code and images

#### Start production server with PM2

It is recommended to run the application with [PM2](https://github.com/Unitech/pm2).

First off, install PM2 with `npm install -g pm2`

Then to start the application run `pm2 start ecosystem.config.js`. The application will start by default on the port defined in `/server/config/environment/production.js`. Change the port or define the environment variable `PORT` to change the port on which the application is run.

If you don't want to use pm2, you can use gulp serve:dist, but be aware that you will need to manually restart your app if there is an error with it.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
