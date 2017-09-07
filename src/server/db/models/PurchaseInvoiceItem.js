'use strict';
const Sequelize = require('sequelize');

module.exports.init = function(db, config) {
  /**
   * PurchaseInvoiceItem
   * @class PurchaseInvoiceItem
   */
  return db.define('PurchaseInvoiceItem',
    /** @lends PurchaseInvoiceItem */
    {
      /**
       * Primary key.
       */
      id: {
        field: 'PurchaseInvoiceItemSN',
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      /**
       * Foreign key to an invoice which owns this item.
       */
      purchaseInvoiceId: {
        field: 'PurchaseInvoiceSN',
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'PurchaseInvoice',
          key: 'PurchaseInvoiceSN'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      /**
       * Line number starting from 1 per invoice.
       */
      orderItemNo: {
        field: 'OrderItemNo',
        type: Sequelize.INTEGER,
        allowNull: false
      },
      /**
       * Line item name.
       */
      productDescShort: {
        field: 'ProductDescShort',
        type: Sequelize.STRING(500),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * Line item description.
       */
      productDescLong: {
        field: 'ProductDescLong',
        type: Sequelize.STRING(1000),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * The productID as string.
       */
      productId: {
        field: 'ProductID',
        type: Sequelize.STRING(100),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * Buyer order reference, free text reference information. Optionally used field for matching, for example order number placed to this field by the supplier.
       */
      orderReference: {
        field: 'OrderReference',
        type: Sequelize.STRING(100),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * Buyer order number.
       */
      purchaseOrderId: {
        field: 'PurchaseOrderID',
        type: Sequelize.STRING(50),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * Order date.
       */
      orderDate: {
        field: 'OrderDate',
        type: Sequelize.DATE,
        allowNull: true
      },
      /**
       * Delivery note.
       */
      deliveryNoId: {
        field: 'DeliveryNoID',
        type: Sequelize.STRING(50),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * Unit of measure.
       */
      unitOfMeasureId: {
        field: 'UnitOfMeasureID',
        type: Sequelize.STRING(3),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * Item quantity charged per an invoice.
       */
      quantityCharged: {
        field: 'QuantityCharged',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Originally ordered quantity of an item.
       */
      quantityOrdered: {
        field: 'QuantityOrdered',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Delivered quantity of an item.
       */
      quantityDelivered: {
        field: 'QuantityDelivered',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Net price of an item.
       */
      netPrice: {
        field: 'NetPrice',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Gross price of an item.
       */
      grossPrice: {
        field: 'GrossPrice',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Invoice line total amount VAT included = price per unit VAT included * number of units - discount (199.64 EUR) -- 10% discount calculated.
       */
      totalGrossPriceDiscounted: {
        field: 'TotalGrossPriceDiscounted',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Invoice line total amount VAT excluded = price per unit VAT excluded * number of units - discount (161.00 EUR) -- 10% discount calculated.
       */
      totalNetPriceDiscounted: {
        field: 'TotalNetPriceDiscounted',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Invoice line amount VAT included = price per unit VAT included * number of units (219.60 EUR).
       */
      totalGrossPrice: {
        field: 'TotalGrossPrice',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Invoice line amount VAT excluded = price per unit VAT excluded * number of units (177.10 EUR).
       */
      totalNetPrice: {
        field: 'TotalNetPrice',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * VAT percentage.
       */
      vatPercentage: {
        field: 'VatPercentage',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      }
    },
    {
      classMethods: {
        associate: function(models) {
          models.PurchaseInvoiceItem.belongsTo(models.PurchaseInvoice, {
            as: 'purchaseInvoice'
          });
          models.PurchaseInvoiceItem.belongsToMany(models.MatchingDocument, {
            as: 'matchingDocuments',
            through: models.PurchaseInvoice2MatchingDocument,
            foreignKey: 'PurchaseInvoiceItemSN',
            otherKey: 'MatchingDocumentSN'
          });
          models.PurchaseInvoiceItem.belongsToMany(models.MatchingDocumentItem, {
            as: 'matchingDocumentItems',
            through: models.PurchaseInvoice2MatchingDocument,
            foreignKey: 'PurchaseInvoiceItemSN',
            otherKey: 'MatchingDocumentItemSN'
          });
        }
      },
      timestamps: false,
      tableName: 'PurchaseInvoiceItem'
    });
};
