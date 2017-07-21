'use strict';

const uniqueIdGenerator = require('../utils/uniqueIdGenerator');
const Errors = require('epilogue').Errors;

/**
 * Defines rest crud endpoint for invoice receipt
 *
 * @param epilogue
 * @param db
 */
module.exports = function(epilogue, db) {
  const invoiceReceiptResource = epilogue.resource({
    model: db.models.InvoiceReceipt,
    endpoints: [
      '/invoiceReceipts',
      '/invoiceReceipts/:key'
    ]
  });

  invoiceReceiptResource.use({
    create: {
      write: {
        after: (req, rest, context) => {
          context.instance.update(
            { 'invoiceReceiptId': uniqueIdGenerator('INV', context.instance.key) },
            { fields: ['invoiceReceiptId'] }
          ).then(() => {
            context.continue();
          }).catch((err) => {
            console.error(err);
            context.error(new Errors.EpilogueError("Failed saving unique invoice id [invoiceReceiptId]"));
          });
        }
      }
    }
  });
};
