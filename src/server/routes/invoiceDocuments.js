'use strict';

const BlobClient = require('ocbesbn-blob-client');
const blobClient = new BlobClient();

/**
 * Defines rest crud endpoint for purchase invoice pdf documents
 *
 * @param app
 * @param db
 */
module.exports = function(app, db) {
  app.get('/api/invoices/:invoiceId/documents/:documentName', (req, res, next) => {
    const tenantId = req.opuscapita.userData().customerid;
    const path = `/private/purchaseInvoices/${req.params.invoiceId}/${req.params.documentName}`;
    blobClient.readFile(tenantId, path).then((document) => {
      res.writeHead(200, { 'Content-Type': 'application/pdf',  'Content-Length': document.length });
      res.end(document);
    }).catch((error) => next(error)); // TODO: handle errors more accurately
  });
};

