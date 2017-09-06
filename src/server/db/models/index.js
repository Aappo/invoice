'use strict';

const Promise = require('bluebird');
/**
 * Initializes all required database models using Sequelize.
 *
 * @param {object} db - [Sequelize]{@link https://github.com/sequelize/sequelize} instance.
 * @param {object} config - Everything from [config.data]{@link https://github.com/OpusCapitaBusinessNetwork/db-init} passed when running the db-initialization.
 * @returns {Promise} [Promise]{@link http://bluebirdjs.com/docs/api-reference.html}
 * @see [Creating database models]{@link https://github.com/OpusCapitaBusinessNetwork/db-init#creating-database-models}
 */
module.exports.init = function(db, config) {
  require('./PurchaseInvoice.js').init(db, config);
  require('./PurchaseInvoiceItem.js').init(db, config);
  require('./MatchingDocument.js').init(db, config);
  require('./MatchingDocumentItem.js').init(db, config);
  require('./PurchaseInvoice2MatchingDocument.js').init(db, config);

    // Always return a promise.
  return Promise.resolve();
};
