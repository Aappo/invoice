let Labels = {};
Labels.header = 'Rechnungsübersicht';
Labels.all = 'alle';
Labels.nothingFound = 'Leere Ergebnismenge';
Labels.invoice = 'Rechnung';
Labels.invoicedOn = 'Rechnungsdatum';
Labels.status = 'Status';
Labels.supplier = 'Lieferant';
Labels.customer = 'Kunde';
Labels.purchaseOrderId = 'Bestell-Nr.';
Labels.areYouSure = 'Sind Sie sicher?';
Labels.questionInvoiceDelete = 'Möchten Sie die Rechnung wirklich löschen?';
Labels.invoiceDeleted = 'Rechnung wurde gelöscht.';
Labels.notDeleted = "Achtung: Rechnung konnte nicht gelöscht werden.";

Labels.intInvoiceNo = 'Int. Re.-Nr.';
Labels.extInvoiceNo = 'Fremdbelegnummer';
Labels.dueDate = 'Fälligkeitsdatum';
Labels.totalGrossPrice = 'Brutto-Summe';
Labels.selectCustomer = 'Kunde auswählen';
Labels.ok = 'OK';
Labels.cancel = 'Abbrechen';

let Commands = {};
Commands.reset = 'Zurücksetzen';
Commands.search = 'Suchen';
Commands.edit = 'Bearbeiten';
Commands.show = 'Detailansicht';
Commands.print = 'Drucken';
Commands.export = 'Exportieren';
Commands.delete = 'Löschen';
Commands.duplicate = 'Duplicate';

let Messages = {};
Messages.loadingData = "Searching for Invoices...";
Messages.loadingDataError = "Invoice searching error, please reload page."

export default {
  Labels: Labels,
  Commands: Commands,
  Messages: Messages
};
