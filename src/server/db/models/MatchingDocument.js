'use strict';
const Sequelize = require('sequelize');

module.exports.init = function(db, config) {
  /**
   * MatchingDocument
   * @class MatchingDocument
   */
  return db.define('MatchingDocument',
    /** @lends MatchingDocument */
    {
      /**
       * Primary key.
       */
      id: {
        field: 'MatchingDocumentSN',
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      /**
       * E.g. PO or PO_NO_GR.
       */
      type: {
        field: 'Type',
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      /**
       * The currency code.
       */
      currencyId: {
        field: 'CurrencyID',
        type: Sequelize.STRING(3),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /**
       * Owner company (customer).
       */
      customerId: {
        field: 'CustomerID',
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      /**
       * Buyer order number.
       */
      purchaseOrderId: {
        field: 'PurchaseOrderID',
        type: Sequelize.STRING(30),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /**
       * Supplier code.
       */
      supplierId: {
        field: 'SupplierID',
        type: Sequelize.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /**
       * Terms of delivery.
       */
      termsOfDeliveryId: {
        field: 'TermsOfDeliveryID',
        type: Sequelize.STRING(100),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /**
       * Method of payment.
       */
      methodOfPaymentId: {
        field: 'MethodOfPaymentID',
        type: Sequelize.STRING(100),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /**
       * Terms of payment code.
       */
      termsOfPaymentId: {
        field: 'TermsOfPaymentID',
        type: Sequelize.STRING(100),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /**
       * Delivery number.
       */
      deliveryNoteId: {
        field: 'DeliveryNoteID',
        type: Sequelize.STRING(30),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /**
       * Delivery date.
       */
      deliveredOn: {
        field: 'DeliveredOn',
        type: Sequelize.DATE,
        allowNull: true
      }
    },
    {
      classMethods: {
        associate: function(models) {
          models.MatchingDocument.hasMany(models.MatchingDocumentItem, {
            as: 'items',
            foreignKey: 'matchingDocumentId',
            targetKey: 'id'
          });
          models.MatchingDocument.belongsToMany(models.PurchaseInvoice, {
            as: 'purchaseInvoices',
            through: models.PurchaseInvoice2MatchingDocument,
            foreignKey: 'MatchingDocumentSN',
            otherKey: 'PurchaseInvoiceSN'
          });
          models.MatchingDocument.belongsToMany(models.PurchaseInvoiceItem, {
            as: 'purchaseInvoiceItems',
            through: models.PurchaseInvoice2MatchingDocument,
            foreignKey: 'MatchingDocumentSN',
            otherKey: 'PurchaseInvoiceItemSN'
          });
        }
      },
      timestamps: false,
      tableName: 'MatchingDocument'
    });
};
