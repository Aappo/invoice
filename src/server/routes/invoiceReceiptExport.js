'use strict';

const lodash = require('lodash');

/**
 * Rest endpoint for exporting PurchaseInvoices into JSON format
 *
 * @param app
 * @param db
 */
module.exports = function(app, db) {
  app.get('/api/invoices/export', (req, res) => {
    console.log(req.query.exportIds);
    console.log(lodash.map(req.query.exportIds, parseInt));

    db.models.PurchaseInvoice.findAll({
      where: {
        id: {
          $in: lodash.map(lodash.castArray(req.query.exportIds), stringId => (parseInt(stringId, 10)))
        }
      },
      include: [{
        model: db.models.PurchaseInvoiceItem,
        as: 'purchaseInvoiceItems'
      }]
    }).then(invoices => {
      res.set({
        'Content-Disposition': `attachment; filename=invoiceExport-${Date.now()}.json`,
        'Content-type': 'text/csv'
      });
      res.send((lodash.isEmpty(invoices) || lodash.isNil(invoices)) ? {} : invoices);
    });
  });
};
