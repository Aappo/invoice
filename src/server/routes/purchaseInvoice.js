'use strict';

/**
 * Defines rest crud endpoint for purchase invoice
 *
 * @param epilogue
 * @param db
 */
module.exports = function(epilogue, app, db) {
  epilogue.resource({
    model: db.models.PurchaseInvoice,
    endpoints: [
      '/invoices',
      '/invoices/:id'
    ]
  });

  /**
   * Endpoint to update invoice comment
   *
   * TODO: it is temporary implementation and saves json into the db
   * FIXME: make normal implementation with db later
   */
  app.put('/api/invoices/:id/comment', (req, res) => {
    return db.models.PurchaseInvoice.findById(req.params.id).then(invoice => {
      if (invoice) {
        //we assume object {message: '..', event: '...'}
        const commentStructure = Object.assign(
          {
            date: new Date(),
            firstName: req.opuscapita.userData('firstName'),
            lastName: req.opuscapita.userData('lastName'),
            id: req.opuscapita.userData('id')
          },
          req.body
        );

        if (invoice.commentary) {
          invoice.commentary = JSON.stringify(
            JSON.parse(invoice.commentary).concat(commentStructure)
          )
        } else {
          invoice.commentary = JSON.stringify([commentStructure])
        }
        return invoice.save().then(updatedInvoice => Promise.resolve(res.json(updatedInvoice)));
      } else {
        return Promise.resolve(res.status(500).send(new Error("Invalid invoice id")));
      }
    })
  });

  /**
   * Endpoint to get invoice comment
   *
   * TODO: it is temporary implementation to get json string from db, later we need normal impl
   * FIXME: make normal implementation with db later
   */
  app.get('/api/invoices/:id/comments', (req, res) => {
    return db.models.PurchaseInvoice.findById(req.params.id).then(invoice => {
      if (invoice) {
        return Promise.resolve(res.send(invoice.commentary? JSON.parse(invoice.commentary) : []));
      } else {
        return Promise.resolve(res.status(500).send(new Error("Invalid invoice id")));
      }
    })
  });
};
