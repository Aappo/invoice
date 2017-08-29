'use strict';

const BlobClient = require('ocbesbn-blob-client');

/**
 * Defines rest crud endpoint for purchase invoice PDF attachment.
 *
 * @param app
 * @param db
 */
module.exports = function(app, db) {

  /**
   * Return attachment that should be used for invoice image
   */
  app.get('/api/invoices/:invoiceId/attachments/image', (req, res, next) => {
    const tenantId = `c_${req.opuscapita.userData('customerId')}`;
    const path = `/private/purchaseInvoices/${req.params.invoiceId}/`;
    const blobClient = new BlobClient({ serviceClient: req.opuscapita.serviceClient });
    blobClient.listFiles(tenantId, path).then((filesList) => {
      const attachmentInfo = filesList.find(file => file.extension === '.pdf');
      if (attachmentInfo) {
        return blobClient.readFile(tenantId, attachmentInfo.path).then(document => {
          res.writeHead(200, { 'Content-Type': 'application/pdf',  'Content-Length': document.length });
          res.end(document);
        });
      } else {
        return res.status(404).json({ message: 'No attachment found for purchase invoice.' });
      }
    }).catch((error) => next(error)); // TODO: handle errors more accurately
  });

  /**
   * Return information about all attachment files
   */
  app.get('/api/invoices/:invoiceId/attachments', (req, res, next) => {
    const blobClient = new BlobClient({ serviceClient: req.opuscapita.serviceClient });
    return blobClient.listFiles(
      `c_${req.opuscapita.userData('customerId')}`,
      `/private/purchaseInvoices/${req.params.invoiceId}/`
    ).then((attachments) => {
      return res.send(attachments);
    }).catch((error) =>
      next(error)
    );
  });

  /**
   * Return attachment with specified name
   */
  app.get('/api/invoices/:invoiceId/attachments/:attachmentName', (req, res, next) => {
    const tenantId = `c_${req.opuscapita.userData('customerId')}`;
    const blobClient = new BlobClient({ serviceClient: req.opuscapita.serviceClient });
    const path = `/private/purchaseInvoices/${req.params.invoiceId}/${req.params.attachmentName}`;

    return blobClient.readFile(tenantId, path).then(document => {
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${req.params.attachmentName}"`,
        'Content-Length': document.length
      });
      res.end(document);
    }).catch(error => next(error));
  });
};
