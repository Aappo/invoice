'use strict';

const server = require('ocbesbn-web-init'); // Web server
const db = require('ocbesbn-db-init'); // Database
const express = require('express');
const bouncer = require('ocbesbn-bouncer');
const userIdentityMiddleWare = require('useridentity-middleware');

// Basic database and web server initialization.
// See database : https://github.com/OpusCapitaBusinessNetwork/db-init
// See web server: https://github.com/OpusCapitaBusinessNetwork/web-init
db.init(
  {
    mode: db.Mode.Dev,
    consul: {
      host: 'consul'
    },
    data: {
      addTestData: false
    },
    events: {
      /**
       * Every model definition may contains 'associate' function that inits model relations
       * each associate function should be called when models are registered in sequelize
       * @param db
       */
      onBeforeDataMigration: function(db) {
        console.log("Associating models....");
        for (let modelName of Object.keys(db.models)) {
          if (db.models[modelName].associate) {
            db.models[modelName].associate(db.models)
          }
        }
      }
    }
  }
).then((db) => {
  return Promise.resolve(server.init({
    server: {
      mode : server.Server.Mode.Dev,
      port: 3003,
      staticFilePath: express.static(__dirname + '/static'),
      webpack: {
        useWebpack: true,
        configFilePath: process.cwd() + '/webpack.config.js',
      },
      middlewares: [bouncer({
        host: 'consul',
        serviceName: 'invoice',
        acl: require('./acl.json'),
        aclServiceName: 'acl'
      }).Middleware, userIdentityMiddleWare]
    },
    routes: {
      addRoutes: true,
      dbInstance: db
    }
  }));
}).catch((e) => {
  server.end();
  throw e;
});
