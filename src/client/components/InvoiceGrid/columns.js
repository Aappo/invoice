/**
 * Returns list of columns, required for invoice grid with custom formatting.
 *
 * Customer Name
 * Supplier Name
 * Due Date
 * Gross Amount
 * Currency
 * Invoice Number
 *
 * @param i18n
 * @author Daniel Zhitomirsky
 */
export default (i18n) => [
  {
    header: i18n.getMessage('InvoiceGrid.customerName.label'),
    valueKeyPath: ['customerName'],
    valueRender: (invoice) => invoice.get('customer').get('customerName'),
    valueType: 'text',
    width: 240,
  },
  {
    header: i18n.getMessage('InvoiceGrid.supplierName.label'),
    valueKeyPath: ['supplierName'],
    valueRender: (invoice) => invoice.get('supplier').get('supplierName'),
    valueType: 'text',
    width: 240,
  },
  {
    header: i18n.getMessage('InvoiceGrid.dueDate.label'),
    valueKeyPath: ['dueDate'],
    valueType: 'text',
    valueRender: (invoice) => i18n.formatDate(invoice.get('dueDate')),
    width: 240,
  },
  {
    header: i18n.getMessage('InvoiceGrid.grossAmount.label'),
    valueKeyPath: ['grossAmount'],
    valueRender: (invoice) => i18n.formatDecimalNumber(invoice.get('grossAmount')),
    valueType: 'text',
    width: 240,
  },
  {
    header: i18n.getMessage('InvoiceGrid.currency.label'),
    valueKeyPath: ['currencyId'],
    valueType: 'text',
    width: 240,
  },
  {
    header: i18n.getMessage('InvoiceGrid.invoiceNumber.label'),
    valueKeyPath: ['invoiceNo'],
    valueType: 'text',
    width: 240,
  }
];
