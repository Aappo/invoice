'use strict';

const BlobClient = require('ocbesbn-blob-client');

/**
 * Defines rest crud endpoint for purchase invoice PDF attachment.
 *
 * @param app
 * @param db
 */
module.exports = function(app, db) {
  app.get('/api/invoices/:invoiceId/attachment', (req, res, next) => {
    const tenantId = `c_${req.opuscapita.userData().customerid}`;
    const path = `/private/purchaseInvoices/${req.params.invoiceId}/`;
    const blobClient = new BlobClient({ serviceClient: req.opuscapita.serviceClient, forceServiceToken: true });
    blobClient.listFiles(tenantId, path).then((filesList) => {
      const attachmentInfo = filesList.find(file => file.extension === '.pdf');
      if (attachmentInfo) {
        blobClient.readFile(tenantId, attachmentInfo.path).then(document => {
          res.writeHead(200, { 'Content-Type': 'application/pdf',  'Content-Length': document.length });
          res.end(document);
        });
      } else {
        res.status(404).json({ message: 'No attachment found for purchase invoice.' });
      }
    }).catch((error) => next(error)); // TODO: handle errors more accurately
  });
};
