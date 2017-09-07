'use strict';
const Sequelize = require('sequelize');

module.exports.init = function(db, config) {
  return db.define('PurchaseInvoice2MatchingDocument', {
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
  }, {
    classMethods: {
      associate: function(models) {
        models.PurchaseInvoice2MatchingDocument.hasOne(models.PurchaseInvoice, {
          as: 'purchaseInvoice',
          foreignKey: 'id',
          targetKey: 'purchaseInvoiceId'
        });
        models.PurchaseInvoice2MatchingDocument.hasOne(models.PurchaseInvoiceItem, {
          as: 'purchaseInvoiceItem',
          foreignKey: 'id',
          targetKey: 'purchaseInvoiceItemId'
        });
        models.PurchaseInvoice2MatchingDocument.hasOne(models.MatchingDocument, {
          as: 'matchingDocument',
          foreignKey: 'id',
          targetKey: 'matchingDocumentId'
        });
        models.PurchaseInvoice2MatchingDocument.hasOne(models.MatchingDocumentItem, {
          as: 'matchingDocumentItem',
          foreignKey: 'id',
          targetKey: 'matchingDocumentItemId'
        });
      }
    },
    timestamps: false,
    freezeTableName: true,
    tableName: 'PurchaseInvoice2MatchingDocument'
  });
};
