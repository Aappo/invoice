'use strict';

const Sequelize = require('sequelize');

module.exports = function(queryInterface) {
  return queryInterface.createTable('PurchaseInvoice', {
    PurchaseInvoiceSN: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    /**
     * invoice number defined by a supplier
     */
    InvoiceNo: {
      type: Sequelize.STRING(30),
      validate: {
        notEmpty: true
      },
      allowNull: false
    },
    InvoicedOn: {
      type: Sequelize.DATE,
      allowNull: true
    },
    /**
     * scan date should hold the date when the invoice was entered
     * to business network, so not only scanned invoices, but also
     * E-invoices and email invoices as well + other possible ways.
     */
    ScannedOn: {
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
    CustomerID: {
      type: Sequelize.STRING(30),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    SupplierID: {
      type: Sequelize.STRING(50),
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
    PaymentBankAccountID: {
      type: Sequelize.STRING(30),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    /**
     * Net amount of an invoice
     */
    NetAmount: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * Gross amount of an invoice
     */
    GrossAmount: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * VAT amount of an invoice
     */
    VatAmount: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * Currency of an invoice. All invoice related amounts
     * should be presented in this currency (header and line level).
     */
    CurrencyID: {
      type: Sequelize.STRING(3),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    Status: {
      type: Sequelize.STRING(30),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    Assignee: {
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
    SupplierInvoiceID: {
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
    PaymentReferenceNo: {
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
    TermsOfPaymentID: {
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
    TermsOfPaymentDescription: {
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
    DueDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    /**
     * Due date for the first discount.
     * dueDate = invoiceDate + TermsOfPayment.discountDays1
     */
    DueDateEarlyDiscount: {
      type: Sequelize.DATE,
      allowNull: true
    },
    /**
     * Due date for the first discount.
     * dueDate = invoiceDate + TermsOfPayment.discountDays2
     */
    DueDateLateDiscount: {
      type: Sequelize.DATE,
      allowNull: true
    },
    /**
     * earlyDiscount = discountableValue * TermsOfPayment.discountPerc1
     */
    EarlyDiscount: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     * lateDiscount = discountableValue * TermsOfPayment.discountPerc2
     */
    LateDiscount: {
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /**
     *  https://www.vero.fi/en-US/Companies_and_organisations/Prepayment_register
     * If the supplier is not registered in tax prepayment register, then customer is responsible for withholding
     * income tax from invoice.
     * Invoices to supplier which do not have valid registration should be assigned to clarification automatically.
     */
    IsPreliminary: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    /**
     * E-invoice, email invoice, scanned invoice, manually entered...
     * PDF, SCAN, SUPPL-MAN, POFLIP, EDI,
     * show a list box with predefined values
     */
    InvoiceChannel: {
      type: Sequelize.STRING(6),
      validate: {
        notEmpty: true
      },
      allowNull: false
    },
    IsCreditNote: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    InvoiceType: {
      type: Sequelize.STRING(8),
      validate: {
        notEmpty: true
      },
      allowNull: true
    },
    Commentary: {
      type: Sequelize.STRING(2000),
      allowNull: true
    }
  }).then(() => {
    return Promise.all([
      queryInterface.addIndex(
        'PurchaseInvoice',
        ['CurrencyID'],
        { indexName: 'PurchaseInvoice_CurrencyID_idx' }
      ),
      queryInterface.addIndex(
        'PurchaseInvoice',
        ['CustomerID'],
        { indexName: 'PurchaseInvoice_CustomerID_idx' }
      ),
      queryInterface.addIndex(
        'PurchaseInvoice',
        ['SupplierID'],
        { indexName: 'PurchaseInvoice_SupplierID_idx' }
      ),
      queryInterface.addIndex(
        'PurchaseInvoice',
        ['Status'],
        { indexName: 'PurchaseInvoice_Status_idx' }
      ),
      queryInterface.addIndex(
        'PurchaseInvoice',
        ['SupplierInvoiceID'],
        { indexName: 'PurchaseInvoice_SupplierInvoiceID_idx' }
      ),
      queryInterface.addIndex(
        'PurchaseInvoice',
        ['TermsOfPaymentID'],
        { indexName: 'PurchaseInvoice_TermsOfPaymentID_idx' }
      )
    ]);
  });
};
