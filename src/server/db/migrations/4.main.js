'use strict';

const createPurchaseInvoice = require('./invoice-migration/createPurchaseInvoice');
const createPurchaseInvoiceItem = require('./invoice-migration/createPurchaseInvoiceItem');

module.exports.up = function(db, config) {
  return createPurchaseInvoice(db.getQueryInterface()).then(() => createPurchaseInvoiceItem(db.getQueryInterface()));
};

module.exports.down = function(db, config) {
  return db.getQueryInterface().dropTable('PurchaseInvoiceItem').then(() => db.getQueryInterface().dropTable('PurchaseInvoice'));
};
