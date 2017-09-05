'use strict';

const createMatchingDocument = require('./matching-document/createMatchingDocument');
const createMatchingDocumentItem = require('./matching-document/createMatchingDocumentItem');

module.exports.up = function(db, config) {
  return createMatchingDocument(db.getQueryInterface()).then(() => createMatchingDocumentItem(db.getQueryInterface()));
};

module.exports.down = function(db, config) {
  return db.getQueryInterface().dropTable('MatchingDocumentItem').then(() => db.getQueryInterface().dropTable('MatchingDocument'));
};
