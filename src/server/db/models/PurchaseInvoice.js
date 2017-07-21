'use strict';
const Sequelize = require('sequelize');

module.exports.init = function(db, config) {
  /**
   * PurchaseInvoice
   * @class PurchaseInvoice
   */
  return db.define('PurchaseInvoice', {
      /** @lends PurchaseInvoice */
      id: {
        field: 'PurchaseInvoiceSN',
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      /**
       * invoice number defined by a supplier
       */
      invoiceNo: {
        field: 'InvoiceNo',
        type: Sequelize.STRING(30),
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      invoicedOn: {
        field: 'InvoicedOn',
        type: Sequelize.DATE,
        allowNull: true
      },
      /**
       * scan date should hold the date when the invoice was entered
       * to business network, so not only scanned invoices, but also
       * E-invoices and email invoices as well + other possible ways.
       */
      scannedOn: {
        field: 'ScannedOn',
        type: Sequelize.DATE,
        allowNull: true
      },
      /**
       * Owner company (customer) of an invoice.
       * Selected from the list in case of manually entered invoice and
       * imported invoice will find a correct owner company according some
       * public/legal company information wich need to be matched from the material to
       * company registry's unique entity or otherwise an invoice will not be attached to any company.
       */
      customerId: {
        field: 'CustomerID',
        type: Sequelize.STRING(30),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * coming from the customer, Customer may have multiple bank accounts, here we decide which one we use for the payment
       */
      /**
       * BankAccount is a class, external to this module which stores the complete bank information for the customer
       * so we know what bankAccount we pay this invoice from
       */
      paymentBankAccountId: {
        field: 'PaymentBankAccountID',
        type: Sequelize.STRING(30),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * Net amount of an invoice
       */
      netAmount: {
        field: 'NetAmount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Gross amount of an invoice
       */
      grossAmount: {
        field: 'GrossAmount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * VAT amount of an invoice
       */
      vatAmount: {
        field: 'VatAmount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * Currency of an invoice. All invoice related amounts
       * should be presented in this currency (header and line level).
       */
      currencyId: {
        field: 'CurrencyID',
        type: Sequelize.STRING(3),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      status: {
        field: 'Status',
        type: Sequelize.STRING(30),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      assignee: {
        field: 'Assignee',
        type: Sequelize.STRING(255),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * this is the Invoice Number that the supplier is using from himself, which is often
       * used to identify the invoice for the payment
       * unique for a suppliers!
       */
      supplierInvoiceId: {
        field: 'SupplierInvoiceID',
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * Reference number for the payment defined by the supplier, ISO 11649 requires minimum 25
       * characters.
       * this is an alternative to the SupplierInvoiceId
       */
      paymentReferenceNo: {
        field: 'PaymentReferenceNo',
        type: Sequelize.STRING(25),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * default terms of payment code copied from a supplier attached to
       * an invoice. Should be possible to change manually as well)
       */
      termsOfPaymentId: {
        field: 'TermsOfPaymentID',
        type: Sequelize.STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * terms of payment description holds data from the invoice material
       * which should be overwritten by supplier selection and default terms of payment selection
       */
      termsOfPaymentDescription: {
        field: 'TermsOfPaymentDescription',
        type: Sequelize.STRING(100),
        validate: {
          notEmpty: true
        },
        allowNull: true
      },
      /**
       * Due date for the payment.
       * dueDate = invoiceDate + TermsOfPayment.netDays
       */
      dueDate: {
        field: 'DueDate',
        type: Sequelize.DATE,
        allowNull: true
      },
      /**
       * Due date for the first discount.
       * dueDate = invoiceDate + TermsOfPayment.discountDays1
       */
      dueDateEarlyDiscount: {
        field: 'DueDateEarlyDiscount',
        type: Sequelize.DATE,
        allowNull: true
      },
      /**
       * Due date for the first discount.
       * dueDate = invoiceDate + TermsOfPayment.discountDays2
       */
      dueDateLateDiscount: {
        field: 'DueDateLateDiscount',
        type: Sequelize.DATE,
        allowNull: true
      },
      /**
       * earlyDiscount = discountableValue * TermsOfPayment.discountPerc1
       */
      earlyDiscount: {
        field: 'EarlyDiscount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       * lateDiscount = discountableValue * TermsOfPayment.discountPerc2
       */
      lateDiscount: {
        field: 'LateDiscount',
        type: Sequelize.DECIMAL(19, 2),
        allowNull: true
      },
      /**
       *  https://www.vero.fi/en-US/Companies_and_organisations/Prepayment_register
       * If the supplier is not registered in tax prepayment register, then customer is responsible for withholding
       * income tax from invoice.
       * Invoices to supplier which do not have valid registration should be assigned to clarification automatically.
       */
      isPreliminary: {
        field: 'IsPreliminary',
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      /**
       * E-invoice, email invoice, scanned invoice, manually entered...
       * PDF, SCAN, SUPPL-MAN, POFLIP, EDI,
       * show a list box with predefined values
       */
      invoiceChannel: {
        field: 'InvoiceChannel',
        type: Sequelize.STRING(6),
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      isCreditNote: {
        field: 'IsCreditNote',
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      invoiceType: {
        field: 'InvoiceType',
        type: Sequelize.STRING(8),
        validate: {
          notEmpty: true
        },
        allowNull: true
      }
    },
    {
      classMethods: {
        associate: function(models) {
          models.PurchaseInvoice.hasMany(models.PurchaseInvoiceItem, {
            as: 'items',
            foreignKey: 'purchaseInvoiceId',
            targetKey: 'id'
          });
        }
      },
      timestamps: false,
      tableName: 'PurchaseInvoice'
    });
};
