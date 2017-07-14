'use strict';
const _ = require('lodash');

/**
 * Import invoice receipt items and returns promise that will be associated with
 * statistical object {created: n, failed: k}
 *
 * @param db - db model {models, sequelize and etc. object}
 * @param invoiceReceiptItems - invoice receipt items array JSON representation
 * @param invoice - InvoiceReceipt instatnce that will be associated with imported items
 * @return {Promise.<TResult>}
 */
const importInvoiceItems = (db, invoiceReceiptItems, invoice) => {
  return Promise.all(
    _.map(invoiceReceiptItems, (item) => {
      return db.models.CostDistribution.create().then((costDistribution) => {
        return db.models.InvoiceReceiptItem.create(_.extend(
          item, {
            invoiceReceiptSn: invoice.key,
            costDistributionSn: costDistribution.key
          }
        ))
      }).then((createdItem) => {
        return Promise.resolve({ created: true });
      }).catch((failedItem) => {
        return Promise.resolve({ failed: true });
      })
    })
  ).then((itemImportStatistic) => {
    return Promise.resolve(_.reduce(itemImportStatistic, (statisticAccumulator, itemImportResult) => {
      /* eslint-disable no-param-reassign */
      if (itemImportResult.created) {
        statisticAccumulator.created++;
      } else if (itemImportResult.failed) {
        statisticAccumulator.failed++;
      }
      /* eslint-enable no-param-reassign */
      return statisticAccumulator;
    }, { created: 0, failed: 0 }));
  });
};

/**
 * Creates error callback for invoice import failure
 *
 * @param invoiceReceiptId
 * @return {function()}
 */
const invoiceImportFailedCallback = (invoiceReceiptId) => {
  return () => {
    return Promise.resolve({
      failed: true,
      invoiceReceiptId: invoiceReceiptId
    });
  }
};

/**
 * Removes invoice receipt items of the invoice, then starts import of invoice items and finally collects
 * statistic and resolves it with a promise
 *
 * @param invoice InvoiceReceipt instance
 * @param invoiceData - invoice JSON representation
 * @param db - db model {models, sequelize and etc. object}
 * @param originalStatisticObject - object {invoiceReceiptId: <id>, updated/crated: true}
 * @return {Promise.<TResult>}
 */
const collectInvoiceItemsImportStatistic = (invoice, invoiceData, db, originalStatisticObject) => {
  // removing invoice receipt items
  return db.models.InvoiceReceiptItem.destroy({
    where: {
      invoiceReceiptSn: invoice.key
    }
  }).then(() => {
    // statrting invoice item import
    return importInvoiceItems(
      db,
      invoiceData.invoiceReceiptItems,
      invoice
    ).then((itemImportStatistic) => {
      // collecting items import statistic
      return Promise.resolve(_.extend(
        originalStatisticObject,
        { items: itemImportStatistic }
      ));
    })
  });
};

/**
 * Creates new invoice and items
 *
 * @param insertData - JSON invoice receipt representation
 * @param db - db model {models, sequelize and etc. object}
 * @return {Promise.<TResult>}
 */
const createInvoice = (insertData, db) => {
  // creating new invoice
  return db.models.InvoiceReceipt.create(
    _.omit(insertData, ['invoiceReceiptItems'])
  ).then((newInvoice) => {
    return collectInvoiceItemsImportStatistic(newInvoice, insertData, db, {
      created: true,
      invoiceReceiptId: newInvoice.invoiceReceiptId
    })
  }).catch(invoiceImportFailedCallback(insertData.invoiceReceiptId))
};

/**
 * Updated @invoice2Update with passed @updateDate, existing items will be overwritten
 *
 * @param invoice2Update
 * @param updateData - Invoicereceipt instance
 * @param db - db model {models, sequelize and etc. object}
 * @return {Promise.<TResult>}
 */
const updateInvoice = (invoice2Update, updateData, db) => {
  return invoice2Update.update(
    _.omit(updateData, ['invoiceReceiptItems'])
  ).then((updatedInvoice) => {
    return collectInvoiceItemsImportStatistic(updatedInvoice, updateData, db, {
      updated: true,
      invoiceReceiptId: updatedInvoice.invoiceReceiptId
    })
  }).catch(invoiceImportFailedCallback(updateData.invoiceReceiptId))
};

/**
 * Rest endpoint to perform bulk invoice importing
 *
 * @param app
 * @param db
 */
module.exports = function(app, db) {
  app.post('/api/invoices/import', (req, res) => {
    // importing all invoices in async way - each invoice - separate promise
    Promise.all(
      // converting invoice array to array of import promises
      _.map(req.body, (invoice) => {
        // trying to get already existing invoice for invoiceReceiptId
        return db.models.InvoiceReceipt.findOne({
          where: {
            invoiceReceiptId: invoice.invoiceReceiptId
          }
        }).then((existingInvoice) => {
          // if we already have such invoice - update it otherwise - create new one
          return _.isNil(existingInvoice) ?
            createInvoice(invoice, db) :
            updateInvoice(existingInvoice, invoice, db);
        })
      })
    ).then((importResults) => {
      res.json(importResults);
    })
  });
};
