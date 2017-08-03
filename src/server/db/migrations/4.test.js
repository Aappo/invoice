'use strict';

const invoices = require('./data/purchaseInvoices.json');
const items = require('./data/purchaseInvoiceItems.json');
const BlobClient = require('ocbesbn-blob-client');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const blobClient = new BlobClient();

const createInvoice = (invoice, qi) => {
  return qi.insert(null, 'PurchaseInvoice', invoice, { returning: true }).then(id => {
    return qi.bulkInsert('PurchaseInvoiceItem', items.map(item => Object.assign({}, item, { purchaseInvoiceSN: id }))
    ).then(() => Promise.resolve(Object.assign({}, invoice, { id: id })));
  });
};

const storeDocumentIfNotExist = (invoice) => {
  const path = `/private/purchaseInvoices/${invoice.id}/${invoice.invoiceNo}.pdf`;
  return blobClient.getFileInfo(invoice.customerId, path).catch((error) => {
    // From head request expecting response with status code
    if (error.response && error.response.statusCode === 404) {
      return fs.readFileAsync(`src/server/db/migrations/data/documents/${invoice.invoiceNo}.pdf`).then((document) =>
        blobClient.storeFile(invoice.customerId, path, document, true).catch((error) => { throw Error(error); })
      );
    } else {
      throw Error(error);
    }
  });
};

module.exports.up = function(db, config) {
  // Handling invoices sequentially to prevent TenantContainerMapping collision
  return invoices.map(invoice =>
    () => createInvoice(invoice, db.queryInterface).then(persistedInvoice => storeDocumentIfNotExist(persistedInvoice))
  ).reduce((promise, func) => promise.then(func), Promise.resolve());
};

module.exports.down = function(db, config) {
  return db.queryInterface.bulkDelete('PurchaseInvoice', { invoiceNo: { $in: invoices.map(invoice => invoice.invoiceNo) } });
};
