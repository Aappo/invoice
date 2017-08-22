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
    details: 'Invoice details'
  },
  supplier: {
    title: 'Supplier',
    supplierName: 'Supplier Name',
    supplierId: 'Supplier Code',
    bankAccountNumber: 'Bank Account Number',
    noBankAccountData: 'No Bank Account Information'
  },
  totals: {
    title: 'Totals',
    currency: 'Currency',
    vatAmount: 'VAT total',
    netAmount: 'Invoice net',
    grossAmount: 'Invoice total'
  },
  attachments: {
    title: 'Attachments',
    noAttachments: 'There is no files, attached to this invoice'
  }
};

export default {
  Details: Details,
  TaskItem: TaskItem,
  Action: Action,
  EmptyLayout: EmptyLayout
};
