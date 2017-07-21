'use strict';

/**
 * Defines rest crud endpoint for purchase invoice
 *
 * @param epilogue
 * @param db
 */
module.exports = function(epilogue, db) {
  epilogue.resource({
    model: db.models.PurchaseInvoice,
    endpoints: [
      '/invoices',
      '/invoices/:id'
    ]
  });
};
