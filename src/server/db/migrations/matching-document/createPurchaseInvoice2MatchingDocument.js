'use strict';

const Sequelize = require('sequelize');

module.exports = function(queryInterface) {
  return queryInterface.createTable('PurchaseInvoice2MatchingDocument', {
    id: {
      field: 'PurchaseInvoice2MatchingDocumentSN',
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    purchaseInvoiceId: {
      field: 'PurchaseInvoiceSN',
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'PurchaseInvoice',
        key: 'PurchaseInvoiceSN'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    },
    purchaseInvoiceItemId: {
      field: 'PurchaseInvoiceItemSN',
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'PurchaseInvoiceItem',
        key: 'PurchaseInvoiceItemSN'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    },
    matchingDocumentId: {
      field: 'MatchingDocumentSN',
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'MatchingDocument',
        key: 'MatchingDocumentSN'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    },
    matchingDocumentItemId: {
      field: 'MatchingDocumentItemSN',
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'MatchingDocumentItem',
        key: 'MatchingDocumentItemSN'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    }
  });
};
