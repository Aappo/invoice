'use strict';
const Sequelize = require('sequelize');

module.exports.init = function(db, config) {
  /**
   * MatchingDocumentItem
   * @class MatchingDocumentItem
   */
  return db.define('MatchingDocumentItem',
    /** @lends MatchingDocumentItem */
    {
      /**
       * Primary key.
       */
      id: {
        field: 'MatchingDocumentItemSN',
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
      supplierId: {
        field: 'SupplierID',
        type: Sequelize.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /*
       Position number inside SalesOrderItem, PurchaseOrderItem or InvoiceReceiptItem
       starting with 1
       */
      orderItemNo: {
        field: 'OrderItemNo',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      /*
       This is the string that contains the unique product key. It can be used
       to retrieve the product in the OPC search. In the OPC fulltext index we
       don't have a productSN, so we need this key.
       Typically it contains a concatenation of catalogid and productId
       but it might also include validFrom, validTo
       */
      productId: {
        field: 'ProductID',
        type: Sequelize.STRING(225),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /* Ordered quantity  */
      quantity: {
        field: 'Quantity',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* unit of measure */
      unitOfMeasureId: {
        field: 'UnitOfMeasureID',
        type: Sequelize.STRING(3),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /*
       Factor applied to price when small prices are used,
       e.g. 0.56 EUR per 100 items
       */
      priceUnit: {
        field: 'OrderItemNo',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      /*
       This is the item price per Unit of quantity
       */
      netPrice: {
        field: 'NetPrice',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /*
       This is the item price per Unit of quantity without currency conversion for the currency as stored in the contract.
       */
      grossPrice: {
        field: 'GrossPrice',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* VAT code/VAT percentage  */
      taxId: {
        field: 'TaxID',
        type: Sequelize.STRING(60),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /* VAT/TAX amount */
      taxAmount: {
        field: 'TaxAmount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* PO line total net amount. Is this with discount? */
      totalNetPrice: {
        field: 'TotalNetPrice',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* PO line total gross amount */
      totalGrossPrice: {
        field: 'TotalGrossPrice',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* PO line total VAT amount  */
      totalTaxAmount: {
        field: 'TotalTaxAmount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* Dicsount percentage  */
      percentageDiscount: {
        field: 'PercentageDiscount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* Discount amount  */
      absoluteDiscount: {
        field: 'AbsoluteDiscount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* This is the item surcharge per Unit of quantity */
      surchargeAmount: {
        field: 'SurchargeAmount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* Total extra amounts */
      totalSurchargeAmount: {
        field: 'TotalSurchargeAmount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /*
       Contains Open value of Quantity = (POI.quantity - (SUM over all "QuantityReceived" )).
       In contrast to POI.Quantity the OpenQuantity is changeable during
       the GoodsReceipt booking. When POI created, the OpenQuantity is
       initilized with the value from POI.Quantity.
       */
      openQuantity: {
        field: 'OpenQuantity',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /* Delivery address  */
      deliveryAddressId: {
        field: 'DeliveryAddressID',
        type: Sequelize.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /* This should be the person who made the GR  */
      receivingPerson: {
        field: 'ReceivingPerson',
        type: Sequelize.STRING(255),
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      /* Delivered quantity, unit of measure needed.  */
      quantityReceived: {
        field: 'QuantityReceived',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      createdOn: {
        field: 'CreatedOn',
        type: Sequelize.DATE,
        allowNull: false
      },
      createdBy: {
        field: 'CreatedBy',
        type: Sequelize.STRING(60),
        allowNull: false
      },
      changedOn: {
        field: 'ChangedOn',
        type: Sequelize.DATE,
        allowNull: false
      },
      changedBy: {
        field: 'ChangedBy',
        type: Sequelize.STRING(60),
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          models.MatchingDocumentItem.belongsTo(models.MatchingDocument, {
            as: 'matchingDocument'
          });
        }
      },
      timestamps: true,
      createdAt: 'createdOn',
      updatedAt: 'changedOn',
      tableName: 'MatchingDocumentItem'
    });
};
