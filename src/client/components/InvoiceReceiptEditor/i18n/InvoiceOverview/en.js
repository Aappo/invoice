let Labels = {};
Labels.header = 'Invoice Overview';
Labels.all = 'all';
Labels.nothingFound = 'Nothing found';
Labels.invoice = 'Invoice';
Labels.invoicedOn = 'Invoice Date';
Labels.status = 'Status';
Labels.supplier = 'Supplier';
Labels.customer = 'Customer';
Labels.purchaseOrderId = 'Purchase Order ID';
Labels.areYouSure = 'Are you sure?';
Labels.questionInvoiceDelete = 'Do you really want to delete this Invoice?';
Labels.invoiceDeleted = 'Invoice Receipt was deleted.';
Labels.notDeleted = 'Invoice Receipt was not deleted.';

Labels.intInvoiceNo = 'Int. Invoice No.';
Labels.extInvoiceNo = 'Ext. Invoice No.';
Labels.dueDate = 'Due Date';
Labels.totalGrossPrice = 'Total Gross Price';
Labels.selectCustomer = 'Select Customer';
Labels.ok = 'OK';
Labels.cancel = 'Cancel';

let Commands = {};
Commands.reset = 'Reset';
Commands.search = 'Search';
Commands.edit = 'Edit';
Commands.show = 'Show';
Commands.print = 'Print';
Commands.export = 'Export';
Commands.delete = 'Delete';
Commands.duplicate = 'Duplicate';

let Messages = {};
Messages.loadingData = "Searching for Invoices...";
Messages.loadingDataError = "Invoice searching error, please reload page."

export default {
  Labels: Labels,
  Commands: Commands,
  Messages: Messages
};
