let TaskItem = {};
TaskItem.customerId = 'Gesellschaft-Zahler';
TaskItem.supplierId = 'Lieferant';
TaskItem.dueDate = 'Fälligkeitsdatum';
TaskItem.status = {
  inspectionRequired: 'Überprüfung erforderlich',
  approvalRequired: 'Genehmigung erforderlich',
  inspClrRequired: 'Klärung erforderlich',
  appClrRequired: 'Klärung erforderlich',
  archived: 'Archiviert',
  approved: 'Genehmigt'
};

let MyTaskList = {};
MyTaskList.label = {
  sortBy: 'Sort by',
  dueDate: 'Due date',
  supplier: 'Supplier',
  grossAmount: 'Gross amount'
};

let Action = {
  event: {
    inspect: 'Prüfen',
    sendToClarification: 'Zur Klärung weiterleiten',
    clarifyForInspection: 'Klärung abbrechen',
    clarifyForApproval: 'Klärung abbrechen',
    approve: 'Genehmigen',
    postComment: 'Hinzufügen',
    rejectApproval: "Genehmigung abbrechen",
    rejectInspection: "Überprüfung abbrechen"
  },
  tab: {
    inspect: 'Überprüfung',
    sendToClarification: 'Klärung',
    clarifyForInspection: 'Klärung',
    clarifyForApproval: 'Klärung',
    approve: 'Genehmigung',
    postComment: 'Nur Kommentar',
    rejectApproval: "Status abbrechen",
    rejectInspection: "Status abbrechen"
  }
};
Action.headerLabel = 'Optionaler Kommentar';

let EmptyLayout = {
  message: {
    assignedTasks: "Zur Zeit gibt es keine Rechnungen für Überprufung, Genehmigung oder im Status Klärung.",
    processedTasks: "Zur Zeit gibt es keine Rechnungen in Bearbeitung."
  }
};


let Details = {
  header: {
    image: 'Invoice image',
    details: 'Invoice details',
    posting: 'Invoice posting'
  },
  supplier: {
    title: 'Supplier',
    supplierName: 'Supplier name',
    supplierId: 'Supplier code',
    bankAccountNumber: 'Bank account number',
    noBankAccountData: 'No bank account information'
  },
  totals: {
    title: 'Totals',
    currency: 'Currency code',
    vatAmount: 'VAT amount',
    netAmount: 'Net amount',
    grossAmount: 'Gross amount'
  },
  attachments: {
    title: 'Attachments',
    noAttachments: 'There are no files attached to the invoice'
  },
  comments: {
    noComments: 'There are no comments posted for the invoice'
  }
};

export default {
  Details: Details,
  TaskItem: TaskItem,
  MyTaskList: MyTaskList,
  Action: Action,
  EmptyLayout: EmptyLayout
};
