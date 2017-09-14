const Promise = require('bluebird');
const sequelize = require('sequelize');
const NotFoundError = require('epilogue').Errors.NotFoundError;
const notFoundCallback = () => {
  throw new NotFoundError();
};

/**
 * Defines rest crud endpoints to retrieve tasks for matching.
 *
 * @param app
 * @param epilogue
 * @param db
 */
module.exports = function(app, epilogue, db) {

  /**
   * Fetch matching information about invoice. Information is set in X-Matching-Info header
   * in a form { matched: <matched items quantity>, total: <total items for matching quantity> }.
   */
  app.head('/api/matching/tasks/:id', function (req, res) {
    db.models.PurchaseInvoice.findById(req.params.id).then(task => {
      if (!task) {
        res.status(404);
      }
      return Promise.props({
        matched: db.models.PurchaseInvoice2MatchingDocument.aggregate(
          'purchaseInvoiceItemId',
          'count',
          {
            distinct: true,
            where: { purchaseInvoiceId: { $eq: task.id } }
          }
        ),
        total: db.models.PurchaseInvoiceItem.count(
          {
            where: { 'purchaseInvoiceId': { $eq: task.id }, 'purchaseOrderId': { $ne: null } }
          }
        )
      })
    }).then(info => {
      res.setHeader('X-Matching-Info', JSON.stringify(info));
      res.status(200).end();
    }).catch((error) => {
      res.status(500).end();
    })
  });

  /**
   * Fetch only invoices which assigned to current customer and have at least one item with purchaseOrderId set.
   */
  const matchingResource = epilogue.resource({
    model: db.models.PurchaseInvoice,
    endpoints: [
      '/matching/tasks',
      '/matching/tasks/:id'
    ]
  });

  matchingResource.use({
    list: {
      fetch: {
        before: function (req, res, context) {
          db.models.PurchaseInvoice.findAll({
            where: { customerId: req.opuscapita.userData('customerid') },
            include: [{
              attributes: [],
              model: db.models.PurchaseInvoiceItem,
              as: 'purchaseInvoiceItems',
              where: { purchaseOrderId: { $ne: null } }
            }]
          }).then(tasks => {
            context.instance = tasks;
            context.skip();
          })
        }
      }
    },
    create: {
      write: {
        before: notFoundCallback
      }
    },
    delete: {
      fetch: {
        before: notFoundCallback
      }
    }
  });

  /**
   * Fetch only invoice items with purchaseOrderId field set.
   */
  const matchingItemsResource = epilogue.resource({
    model: db.models.PurchaseInvoiceItem,
    endpoints: [
      '/matching/tasks/:invoiceId/items',
      '/matching/tasks/:invoiceId/items/:id'
    ]
  });

  matchingItemsResource.use({
    list: {
      fetch: {
        before: function (req, res, context) {
          db.models.PurchaseInvoiceItem.findAll({
            where: {
              purchaseInvoiceId: { $eq: req.params.invoiceId },
              purchaseOrderId: { $ne: null }
            }
          }).then(tasks => {
            context.instance = tasks;
            context.skip();
          })
        }
      }
    },
    create: {
      write: {
        before: notFoundCallback
      }
    },
    delete: {
      fetch: {
        before: notFoundCallback
      }
    }
  });
};
