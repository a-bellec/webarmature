# webarmature

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.1.4.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [SQLite](https://www.sqlite.org/quickstart.html)
- [Node-gyp](https://github.com/nodejs/node-gyp)

#### Production environment variables

The seed for the database use two environment variables to create the first admin account. You have to set them up to be able to use the admin account. They will be used to log in with the admin account.

You have to set them up in `/server/config/local.env.js`. Look at `/server/config/local.env.sample.js` for an example on how to set up those variables

These are the variables you have to set up: `DB_ADMIN_EMAIL` and `DB_ADMIN_PASSWORD`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
