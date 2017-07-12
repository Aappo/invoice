/* eslint-disable */
let Labels = {};
Labels.saved = 'Invoice Receipt was saved successfully.';
Labels.notSaved = 'Invoice Receipt was not saved.';
Labels.questionInvoiceItemDelete = 'Do you really want to delete Invoice/Invoice Position?';
Labels.questionInvoiceDelete = 'Do you really want to delete Invoice?';
Labels.invoiceDeleted = 'Invoice Receipt was deleted successfully.';
Labels.invoiceItemDeleted = 'Invoice Receipt Item with key {id} was deleted.';
Labels.saveFailed = 'Object saving failed.';
Labels.createIR = 'Create Invoice » Invoice Header';
Labels.editIR = 'Edit Invoice';
Labels.showIR = 'Show Invoice';
Labels.invoiceHeader = 'Invoice Header';
Labels.definedInItems = 'Defined in items';
Labels.headerTaxList = 'Header Based Tax';
Labels.assigneeSelection = 'Assign Invoice for Approval';
Labels.totalNetPricesMatchingError = 'The total net amount of the invoice doesn\'t match with the sum of the invoice position net amounts. You are not able to proceed with booking. Please revise the invocie and try again.';
Labels.totalGrossPricesMatchingError = 'The total gross price of the invoice doesn\'t match with the sum of the invoice position gross amounts. You are not able to proceed with booking. Please revise the invoice and try again.';
Labels.totalTaxAmountsMatchingError = 'The total tax amount of the invoice doesn\'t match with the sum of the invoice position tax amounts. You are not able to proceed with booking. Please revise the invoice and try again.';
Labels.finalBookingConfirmation = 'Do you really want to finish filling this invoice in? After a final booking no changes can be applied to the invoice.';
Labels.goodsRecieptMissingWarning = 'There are Invoice Items with "Goods Receipt Missing" status. Do you want to proceed?';
Labels.pdfGeneratingMessage = 'Please wait while the PDF file is generated...';

Labels.invoiceItems = 'Invoice Items';
Labels.productId = 'Product ID';
Labels.description = 'Description';
Labels.status = 'Status';
Labels.quantity = 'Quantity';
Labels.price = 'Price';
Labels.totalNetPrice = 'Total Net Price';
Labels.poPoiRef = 'PO/POI Ref';

Labels.supplier = 'Supplier';
Labels.supplierAddress = 'Supplier Address';
Labels.supplierContact = 'Supplier Contact';
Labels.customer = 'Customer';
Labels.customerAddress = 'Customer Address';
Labels.iban = 'IBAN';
Labels.bic = 'BIC';
Labels.vatRegNo = 'VAT ID';
Labels.extInvoiceReceiptId = 'Number of Original Invoice';
Labels.accountingRecordId = 'Reference Number';
Labels.referenceInformation = 'Reference Information';
Labels.receivingPerson = 'Receiving Person';
Labels.intrastat = 'Intrastat';

Labels.status = 'Status';
Labels.invoiceDate = 'Date of Issue';
Labels.bookingDate = 'Booking Date';
Labels.dueDate = 'Due Date';
Labels.scannedOn = 'Scanned on';
Labels.receivedOn = 'Baseline Date';
Labels.comment = 'Comment';

Labels.currency = 'Currency';
Labels.orderNumber = 'Order Number';
Labels.taxCountry = 'Tax Country';
Labels.taxRate = 'Tax Rate';
Labels.totalTaxAmount = 'Total Tax Amount';
Labels.totalGrossPrice = 'Total Gross Price';

Labels.termsOfPayment = 'Payment Terms';
Labels.methodOfPayment = 'Method of Payment';
Labels.termsOfDelivery = 'Terms of Delivery';
Labels.periodOfService = 'Period of Service';

Labels.discountableValue = 'Discountable Value';
Labels.earlyDiscount = 'Early Discount';
Labels.dueDateEarlyDiscount = 'Early Discount Due';

Labels.lateDiscount = 'Late Discount';
Labels.dueDateLateDiscount = 'Late Discount Due';

Labels.createdBy = 'Created By';
Labels.createdOn = 'Created On';
Labels.changedBy = 'Changed By';
Labels.changedOn = 'Changed On';

Labels.documents = 'Documents';
Labels.tax = 'Tax';
Labels.taxBaseAmount = 'Tax Base Amount';
Labels.taxAmount = 'Tax Amount';
Labels.vatBreakdown = 'VAT Breakdown';
Labels.vatAmount = 'VAT Amount';

let Commands = {};
Commands.togglePdf = 'Toggle PDF';
Commands.cancel = 'Cancel';
Commands.save = 'Save';
Commands.delete = 'Delete';
Commands.preview = 'Preview';
Commands.attachments = 'Attachments';
Commands.history = 'History';
Commands.addPositions = 'Add Positions';

Labels.type = 'Type';
Labels.invoiceReceiptId = 'Internal Invoice No.';

let Events = {};
Events.finalBooking = 'Final Booking';

let States = {};
States.open = 'Open';
States.registered = 'Registered';
States.transferred = 'Transferred';

let Types = {
  'invoice': 'Invoice',
  'credit note': 'Credit',
  'invoice confidential': 'Invoice confidential',
  'credit note confidential': 'Credit confidential'
};

let CreateInvoice = {};
CreateInvoice.header = 'Create Invoice';
CreateInvoice.supplier = 'Supplier';
CreateInvoice.customer = 'Customer';
CreateInvoice.type = 'Type';
CreateInvoice.uploadInvoice = 'Upload Invoice';
CreateInvoice.next = 'Next';
CreateInvoice.browseFile = 'Browse file';

let Errors = {};
Errors.notNull = 'Property cannot be null';
Errors.invalidNumber = 'Value must be a valid number';
Errors.notGreaterThanOrEqualTo = "Value is less than minimum value '0'";

export default {
  Labels: Labels,
  Commands: Commands,
  Events: Events,
  States: States,
  Types: Types,
  CreateInvoice: CreateInvoice,
  Errors: Errors
};
