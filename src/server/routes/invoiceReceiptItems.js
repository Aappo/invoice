const _ = require('lodash');
const Errors = require('epilogue').Errors;

/**
 * Defines rest crud endpoint for invoice receipt items
 *
 * @param epilogue
 * @param db
 */
module.exports = function(epilogue, db) {
  const invoiceItemResource = epilogue.resource({
    model: db.models.InvoiceReceiptItem,
    endpoints: [
      '/invoiceReceipts/:id/items',
      '/invoiceReceipts/:invoiceReceiptSn/items/:key',
    ]
  });

  invoiceItemResource.use({
    list: {
      fetch: {
        before: function(req, res, context) {
          db.models.InvoiceReceiptItem.findAll({
            where: {
              invoiceReceiptSn: req.params.id
            }
          }).then((invoiceItems) => {
            // eslint-disable-next-line no-param-reassign
            context.instance = invoiceItems;
            context.skip();
          })
        }
      }
    },
    create: {
      write: {
        before: (req, res, context) => {
          db.models.InvoiceReceipt.findById(req.params.id).then((invoice) => {
            if (!_.isNil(invoice)) {
              db.models.InvoiceReceiptItem.max('orderItemNo', {
                where: {
                  invoiceReceiptItemSn: invoice.key
                }
              }).then((maxOrderItemNo) => {
                db.models.CostDistribution.create().then((costDistribution) => {
                  /* eslint-disable no-param-reassign */
                  context.attributes.costDistributionSn = costDistribution.key;
                  context.attributes.invoiceReceiptSn = req.params.id;
                  context.attributes.orderItemNo = maxOrderItemNo ? maxOrderItemNo + 1 : 0;
                  /* eslint-enable no-param-reassign */
                  context.continue();
                });
              });
            } else {
              context.error(new Errors.BadRequestError("Invalid invoice receipt id"));
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
