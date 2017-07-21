const _ = require('lodash');
const Errors = require('epilogue').Errors;

/**
 * Defines rest crud endpoint for purchase invoice items
 *
 * @param epilogue
 * @param db
 */
module.exports = function(epilogue, db) {
  const purchaseInvoiceItemResource = epilogue.resource({
    model: db.models.PurchaseInvoiceItem,
    endpoints: [
      '/purchaseInvoices/:purchaseInvoiceId/items',
      '/purchaseInvoices/:purchaseInvoiceId/items/:id'
    ]
  });

  purchaseInvoiceItemResource.use({
    list: {
      fetch: {
        before: function(req, res, context) {
          db.models.PurchaseInvoiceItem.findAll({
            where: {
              purchaseInvoiceId: req.params.purchaseInvoiceId
            }
          }).then(purchaseInvoiceItems => {
            // eslint-disable-next-line no-param-reassign
            context.instance = purchaseInvoiceItems;
            context.skip();
          })
        }
      }
    },
    create: {
      write: {
        before: (req, res, context) => {
          // eslint-enable no-param-reassign
          context.attributes.purchaseInvoiceId = req.params.purchaseInvoiceId;
          db.models.PurchaseInvoice.findById(req.params.purchaseInvoiceId).then(invoice => {
            if (!_.isNil(invoice)) {
              db.models.PurchaseInvoiceItem.max('orderItemNo', {
                where: {
                  purchaseInvoiceId: invoice.id
                }
              }).then(maxOrderItemNo => {
                /* eslint-enable no-param-reassign */
                context.attributes.orderItemNo = maxOrderItemNo ? maxOrderItemNo + 1 : 0;
                context.continue();
              });
            } else {
              context.error(new Errors.BadRequestError("Invalid purchase invoice id"));
            }
          }).catch((err) => {
            console.error(err);
            context.skip();
          });
        }
      }
    }
  });
};
