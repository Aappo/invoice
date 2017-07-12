'use strict';

const Promise = require('bluebird');
const invoiceRoutes = require('./invoiceReceipt');
const invoiceItemsRoutes = require('./invoiceReceiptItems');
const staticResources = require('./staticResources');
const termsOfPayment = require('./termsOfPayment');
const termsOfDelivery = require('./termsOfDelivery');
const methodOfPayment = require('./methodOfPayment');
const userData = require('./userData');
const unitsOfMeasure = require('./unitsOfMeasure');
const invoicereceiptImport = require('./invoicereceiptImport');
const invoiceReceiptExport = require('./invoiceReceiptExport');
const glAccount = require('./glAccount');
const approval = require('./approval');
const epilogue = require('epilogue');
const userIdentityMiddleWare = require('useridentity-middleware');

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

  app.use(userIdentityMiddleWare);

  epilogue.initialize({
    app: app,
    sequelize: db,
    base: '/api'
  });

  invoiceReceiptExport(app, db);
  invoiceRoutes(epilogue, db);
  invoiceItemsRoutes(epilogue, db);
  glAccount(epilogue, db);
  staticResources(app, db);
  termsOfPayment(app, db);
  termsOfDelivery(app, db);
  methodOfPayment(app, db);
  userData(app, db);
  unitsOfMeasure(app, db);
  invoicereceiptImport(app, db);
  approval(app, db);

  // Always return a promise.
  return Promise.resolve();
};
