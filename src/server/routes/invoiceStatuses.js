'use strict';

const invoiceStatuses = require('../stubData/invoiceStatuses.json');
const lodash = require('lodash');

/**
 * Stub rest endpoint to load purchase invoice statuses
 * @param app
 * @param db
 */
module.exports = function(app, db) {
  app.get('/api/statuses/invoice', (req, res) => {
    res.json(invoiceStatuses);
  });

  app.get('/api/statuses/invoice/:id', (req, res) => {
    res.json(lodash.find(invoiceStatuses, { statusId: req.params.id }));
  });
};
