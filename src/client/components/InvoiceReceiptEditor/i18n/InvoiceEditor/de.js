/* eslint-disable */
let Labels = {};
Labels.saved = 'Rechnungsnr.';
Labels.notSaved = 'Achtung: Rechnung konnte nicht gespeichert werden!';
Labels.questionInvoiceItemDelete = 'Wollen Sie die Rechnung/Rechnungsposition wirklich löschen?';
Labels.questionInvoiceDelete = 'Möchten Sie die Rechnung wirklich löschen?';
Labels.invoiceDeleted = 'Rechnung wurde gelöscht.';
Labels.invoiceItemDeleted = 'Die Rechnungsposition (mit der ID {id}) wurde gelöscht.';
Labels.saveFailed = 'Speichern fehlgeschlagen..';
Labels.createIR = 'Rechnung erfassen » Rechnungskopf';
Labels.editIR = 'Rechnung bearbeiten';
Labels.showIR = 'Rechnung anzeigen';
Labels.invoiceHeader = 'Rechnungskopf';
Labels.definedInItems = 'Defined in items';
Labels.headerTaxList = 'Kopfsteuer';
Labels.assigneeSelection = 'Rechnung zuweisen';
Labels.totalNetPricesMatchingError = 'Der Nettobetrag der Rechnung stimmt nicht mit der Summe der Einzelpositionen überein. Die Rechnung darf so nicht gebucht werden. Bitte korrigieren Sie die Rechnung bevor Sie fortfahren.';
Labels.totalGrossPricesMatchingError = 'Der Bruttobetrag der Rechnung stimmt nicht mit der Summe der Bruttopreise der Einzelpositionen überein. Die Rechnung darf so nicht gebucht werden. Bitte, korrigieren Sie die Rechnung bevor Sie fortfahren.';
Labels.totalTaxAmountsMatchingError = 'Der Steuerbetrag der Rechnung stimmt nicht mit der Summe der Steuerbeträge der Einzelpositionen überein. Die Rechnung darf so nicht gebucht werden. Bitte, korrigieren Sie die Rechnung bevor Sie fortfahren.';
Labels.finalBookingConfirmation = 'Möchten Sie die Rechnungserfassung wirklich abschließen? Nach dem Abschluss werden keine weiteren Änderungen mehr angenommen.';
Labels.goodsRecieptMissingWarning = 'Es gibt Rechnungspositionen mit dem Status "Wareneingang fehlt". Möchten Sie fortfahren?';
Labels.pdfGeneratingMessage = 'Bitte warten Sie solange die PDF-Datei erzeugt wird...';

Labels.invoiceItems = 'Rechnungspositionen';
Labels.productId = 'Produkt ID';
Labels.description = 'Beschreibung';
Labels.status = 'Status';
Labels.quantity = 'Menge';
Labels.price = 'Preis';
Labels.totalNetPrice = 'Netto-Summe';
Labels.poPoiRef = 'Bestellung/Pos.';

Labels.supplier = 'Lieferant';
Labels.supplierAddress = 'Lieferantenadresse';
Labels.supplierContact = 'Kontaktperson des Lieferanten';
Labels.customer = 'Kunde';
Labels.customerAddress = 'Kundenadresse';
Labels.iban = 'IBAN';
Labels.bic = 'BIC';
Labels.vatRegNo = 'Steuernummer';
Labels.extInvoiceReceiptId = 'Originalrechnungsnummer';
Labels.accountingRecordId = 'Referenznummer';
Labels.referenceInformation = 'Referenzinformationen';
Labels.receivingPerson = 'Empfänger';
Labels.intrastat = 'Intrastat';

Labels.status = 'Status';
Labels.invoiceDate = 'Rechnungsdatum';
Labels.bookingDate = 'Buchungsdatum';
Labels.dueDate = 'Fälligkeitsdatum';
Labels.scannedOn = 'Erfasst am';
Labels.receivedOn = 'ZFB-Datum';
Labels.comment = 'Kommentar';

Labels.currency = 'Währung';
Labels.orderNumber = 'Reihenfolgenummer';
Labels.taxCountry = 'Steuerland';
Labels.taxRate = 'Steuer';
Labels.totalTaxAmount = 'Steuerbetrag';
Labels.totalGrossPrice = 'Brutto-Summe';

Labels.termsOfPayment = 'Zahlungsbedingungen';
Labels.methodOfPayment = 'Zahlungsart';
Labels.termsOfDelivery = 'Lieferbedingungen';
Labels.periodOfService = 'Leistungszeitraum';

Labels.discountableValue = 'Skontierbarer Betrag';
Labels.earlyDiscount = 'Skonto zur ersten Fälligkeit';
Labels.dueDateEarlyDiscount = 'Fälligkeit erstes Skonto';

Labels.lateDiscount = 'Skonto zur zweiten Fälligkeit';
Labels.dueDateLateDiscount = 'Fälligkeit zweites Skonto';

Labels.createdBy = 'Erstellt durch';
Labels.createdOn = 'Erstellt am';
Labels.changedBy = 'Geändert durch';
Labels.changedOn = 'Geändert am';

Labels.documents = 'Dokumente';
Labels.tax = 'Steuer';
Labels.taxBaseAmount = 'Steuerbasisbetrag';
Labels.taxAmount = 'Steuerbetrag';

Labels.type = 'Typ';
Labels.invoiceReceiptId = 'Interne Rechnungsnummer';
Labels.vatBreakdown = 'VAT Breakdown';
Labels.vatAmount = 'VAT Amount';

let Commands = {};
Commands.togglePdf = 'PDF ein-/ausblenden';
Commands.cancel = 'Abbrechen';
Commands.save = 'Speichern';
Commands.delete = 'Löschen';
Commands.preview = 'Vorschau';
Commands.attachments = 'Anhänge';
Commands.history = 'Änderungsprotokoll';
Commands.addPositions = 'Positionen hinzufügen';
Commands.delete = 'Löschen';

let Events = {};
Events.finalBooking = 'Buchung abschließen';

let States = {};
States.open = 'offen';
States.registered = 'registriert';
States.transferred = 'übertragen';

let Types = {
  'invoice': 'Rechnung',
  'credit note': 'Gutschrift',
  'invoice confidential': 'Vertrauliche Rechnung',
  'credit note confidential': 'Vertrauliche Gutschrift'
};

let CreateInvoice = {};
CreateInvoice.header = 'Rechnung erfassen';
CreateInvoice.supplier = 'Lieferant';
CreateInvoice.customer = 'Kunde';
CreateInvoice.type = 'Typ';
CreateInvoice.uploadInvoice = 'Rechnung hochladen';
CreateInvoice.next = 'Weiter';
CreateInvoice.browseFile = 'Dateiverzeichnis durchsuchen';

let Errors = {};
Errors.notNull = 'Die Eigenschaft darf nicht null sein';
Errors.invalidNumber = 'Die Wert muss eine gültige Zahl sein';
Errors.notGreaterThanOrEqualTo = "Der Wert ist kleiner als der Mindestwert von '0'";

export default {
  Labels: Labels,
  Commands: Commands,
  Events: Events,
  States: States,
  Types: Types,
  CreateInvoice: CreateInvoice,
  Errors: Errors
};
