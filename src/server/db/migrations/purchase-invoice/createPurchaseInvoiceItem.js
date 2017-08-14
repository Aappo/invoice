'use strict';

const Sequelize = require('sequelize');

module.exports = function(queryInterface) {
  return queryInterface.createTable('PurchaseInvoiceItem', {
    PurchaseInvoiceItemSN: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    /**
     * foreign key to an invoice which owns this item
     */
    PurchaseInvoiceSN: {
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
     * line number staring from 1 per invoice
     */
    OrderItemNo: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    /**
     * line item name
     */
    ProductDescShort: {
      type: Sequelize.STRING(500),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    /**
     * line item description
     */
    ProductDescLong: {
      type: Sequelize.STRING(1000),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    ProductID: {
      type: Sequelize.STRING(100),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    /**
     * buyer order reference, free text reference information.
     * Optionally used field for matching, for example order number placed
     * to this field by the supplier.
     */
    OrderReference: {
      type: Sequelize.STRING(100),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    /**
     * buyer order number
     */
    PurchaseOrderID: {
      type: Sequelize.STRING(50),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    OrderDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    /**
     * sta: unclear??
     * deliveryNote or transportNote would be more describing term
     * than noteNumber.
     */
    DeliveryNoID: {
      type: Sequelize.STRING(50),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    // check with PROC with BusNetPortal (because we changd regarding SAP/ISO)
    UnitOfMeasureID: {
      type: Sequelize.STRING(3),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    /**
     * item quantity charged per an invoice
     */
    QuantityCharged: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * originally ordered quantity of an item
     */
    QuantityOrdered: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * delivered quantity of an item
     */
    QuantityDelivered: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    NetPrice: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    GrossPrice: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * Invoice line total amount VAT included =
     * price per unit VAT included * number of units - discount (199.64 EUR) -- 10% discount calculated
     */
    TotalGrossPriceDiscounted: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * Invoice line total amount VAT excluded =
     * price per unit VAT excluded * number of units - discount (161.00 EUR) -- 10% discount calculated
     */
    TotalNetPriceDiscounted: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * Invoice line amount VAT included =
     * price per unit VAT included * number of units (219.60 EUR)
     */
    TotalGrossPrice: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * Invoice line amount VAT excluded =
     * price per unit VAT excluded * number of units (177.10 EUR)
     */
    TotalNetPrice: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * VAT percentage
     */
    VatPercentage: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    }
  }).then(() => {
    return Promise.all([
      queryInterface.addIndex(
        'PurchaseInvoiceItem',
        ['PurchaseInvoiceSN'],
        { indexName: 'PurchaseInvoiceItem_PurchaseInvoiceSN_idx' }
      ),
      queryInterface.addIndex(
        'PurchaseInvoiceItem',
        ['UnitOfMeasureID'],
        { indexName: 'PurchaseInvoiceItem_UnitOfMeasureID_idx' }
      ),
      queryInterface.addIndex(
        'PurchaseInvoiceItem',
        ['PurchaseOrderID'],
        { indexName: 'PurchaseInvoiceItem_PurchaseOrderID_idx' }
      )
    ])
  });
};
