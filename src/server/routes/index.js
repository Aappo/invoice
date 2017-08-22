'use strict';

const Promise = require('bluebird');
const path = require('path');

const purchaseInvoiceRoutes = require('./purchaseInvoice');
const purchaseInvoiceItemRoutes = require('./purchaseInvoiceItem');
const purchaseInvoiceImport = require('./purchaseInvoiceImport');
const invoiceAttachment = require('./invoiceAttachment');
const approval = require('./approval');
const staticResources = require('./staticResources');
const termsOfPayment = require('./termsOfPayment');
const termsOfDelivery = require('./termsOfDelivery');
const methodOfPayment = require('./methodOfPayment');
const unitsOfMeasure = require('./unitsOfMeasure');
const epilogue = require('epilogue');
const exphbs = require('express-handlebars');

/**
 * Initializes all routes for RESTful access.
 *
 * @param {object} app - [Express]{@link https://github.com/expressjs/express} instance.
 * @param {object} db - If passed by the web server initialization, a [Sequelize]{@link https://github.com/sequelize/sequelize} instance.
 * @param {object} config - Everything from [config.routes]{@link https://github.com/OpusCapitaBusinessNetwork/web-init} passed when running the web server initialization.
 * @returns {Promise} [Promise]{@link http://bluebirdjs.com/docs/api-reference.html}
 * @see [Minimum setup]{@link https://github.com/OpusCapitaBusinessNetwork/web-init#minimum-setup}
 */
module.exports.init = function(app, db, config) {

  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');
  app.set('views', path.normalize(__dirname + '/../templates'));

  epilogue.initialize({
    app: app,
    sequelize: db,
    base: '/api'
  });

  purchaseInvoiceRoutes(epilogue, db);
  purchaseInvoiceItemRoutes(epilogue, db);
  invoiceAttachment(app, db);
  staticResources(app, db);
  termsOfPayment(app, db);
  termsOfDelivery(app, db);
  methodOfPayment(app, db);
  unitsOfMeasure(app, db);
  purchaseInvoiceImport(app, db);
  approval(app, epilogue, db);

  // Always return a promise.
  return Promise.resolve();
};
