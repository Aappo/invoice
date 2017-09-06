'use strict';

const createMatchingDocument = require('./matching-document/createMatchingDocument');
const createMatchingDocumentItem = require('./matching-document/createMatchingDocumentItem');
const createPurchaseInvoice2MatchingDocument = require('./matching-document/createPurchaseInvoice2MatchingDocument');

module.exports.up = function(db, config) {
  return createMatchingDocument(db.getQueryInterface()).then(
    () => Promise.all([
      () => createMatchingDocumentItem(db.getQueryInterface()),
      () => createPurchaseInvoice2MatchingDocument(db.getQueryInterface())
    ])
  );
};

module.exports.down = function(db, config) {
  return Promise.all([
    db.getQueryInterface().dropTable('MatchingDocumentItem'),
    db.getQueryInterface().dropTable('PurchaseInvoice2MatchingDocument')
  ]).then(() => db.getQueryInterface().dropTable('MatchingDocument'));
};
