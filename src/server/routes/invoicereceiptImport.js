'use strict';

const lodash = require('lodash');

/**
 * Import purchase invoice items and returns promise that will be associated with
 * statistical object {created: n, failed: k}
 *
 * @param db - db model {models, sequelize and etc. object}
 * @param purchaseInvoiceItems - purchase invoice items array JSON representation
 * @param invoice - PurchaseInvoice instatnce that will be associated with imported items
 * @return {Promise.<TResult>}
 */
const importInvoiceItems = (db, purchaseInvoiceItems, invoice) => {
  return Promise.all(
    lodash.map(purchaseInvoiceItems, item => {
      return db.models.PurchaseInvoiceItem.create(lodash.extend(
        item, {
          purchaseInvoiceId: invoice.id
        }
      )).then(createdItem => {
        return Promise.resolve({ created: true });
      }).catch(failedItem => {
        return Promise.resolve({ failed: true });
      })
    })
  ).then((itemImportStatistic) => {
    return Promise.resolve(lodash.reduce(itemImportStatistic, (statisticAccumulator, itemImportResult) => {
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
 * @param purchaseInvoiceId
 * @return {function()}
 */
const invoiceImportFailedCallback = purchaseInvoiceId => {
  return () => {
    return Promise.resolve({
      failed: true,
      purchaseInvoiceId: purchaseInvoiceId
    });
  }
};

/**
 * Removes purchase invoice items of the invoice, then starts import of invoice items and finally collects
 * statistic and resolves it with a promise
 *
 * @param invoice PurchaseInvoice instance
 * @param invoiceData - invoice JSON representation
 * @param db - db model {models, sequelize and etc. object}
 * @param originalStatisticObject - object {purchaseInvoiceId: <id>, updated/crated: true}
 * @return {Promise.<TResult>}
 */
const collectInvoiceItemsImportStatistic = (invoice, invoiceData, db, originalStatisticObject) => {
  // removing purchase invoice items
  return db.models.PurchaseInvoiceItem.destroy({
    where: {
      purchaseInvoiceId: invoice.id
    }
  }).then(() => {
    // statrting invoice item import
    return importInvoiceItems(
      db,
      invoiceData.purchaseInvoiceItems,
      invoice
    ).then(itemImportStatistic => {
      // collecting items import statistic
      return Promise.resolve(lodash.extend(originalStatisticObject, { items: itemImportStatistic }));
    })
  });
};

/**
 * Creates new invoice and items
 *
 * @param insertData - JSON purchase invoice representation
 * @param db - db model {models, sequelize and etc. object}
 * @return {Promise.<TResult>}
 */
const createInvoice = (insertData, db) => {
  // creating new invoice
  return db.models.PurchaseInvoice.create(
    lodash.omit(insertData, ['purchaseInvoiceItems'])
  ).then(newInvoice => {
    return collectInvoiceItemsImportStatistic(newInvoice, insertData, db, {
      created: true,
      purchaseInvoiceId: newInvoice.id
    })
  }).catch(invoiceImportFailedCallback(insertData.purchaseInvoiceId))
};

/**
 * Updated @invoice2Update with passed @updateDate, existing items will be overwritten
 *
 * @param invoice2Update
 * @param updateData - PurchaseInvoice instance
 * @param db - db model {models, sequelize and etc. object}
 * @return {Promise.<TResult>}
 */
const updateInvoice = (invoice2Update, updateData, db) => {
  return invoice2Update.update(
    lodash.omit(updateData, ['purchaseInvoiceItems'])
  ).then(updatedInvoice => {
    return collectInvoiceItemsImportStatistic(updatedInvoice, updateData, db, {
      updated: true,
      purchaseInvoiceId: updatedInvoice.id
    })
  }).catch(invoiceImportFailedCallback(updateData.purchaseInvoiceId))
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
      lodash.map(req.body, invoice => {
        // trying to get already existing invoice for invoiceReceiptId
        return db.models.PurchaseInvoice.findById(invoice.id).then(existingInvoice => {
          // if we already have such invoice - update it otherwise - create new one
          return lodash.isNil(existingInvoice) ?
            createInvoice(invoice, db) :
            updateInvoice(existingInvoice, invoice, db);
        })
      })
    ).then(importResults => {
      res.json(importResults);
    })
  });
};
