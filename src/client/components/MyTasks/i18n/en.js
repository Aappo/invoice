let TaskItem = {};
TaskItem.customerId = 'Payer Company';
TaskItem.supplierId = 'Supplier';
TaskItem.dueDate = 'Due Date';
TaskItem.status = {
  inspectionRequired: 'Inspection required',
  approvalRequired: 'Approval required',
  inspClrRequired: 'Clarification required',
  appClrRequired: 'Clarification required',
  archived: 'Archived',
  approved: 'Approved'
};

let Action = {
  event: {
    inspect: 'Inspect',
    sendToClarification: 'Set to clarification',
    clarifyForInspection: 'Cancel clarification',
    clarifyForApproval: 'Cancel clarification',
    approve: 'Approve',
    postComment: 'Add',
    rejectApproval: "Cancel approval",
    rejectInspection: "Cancel inspection"
  },
  tab: {
    inspect: 'Inspection',
    sendToClarification: 'Clarification',
    clarifyForInspection: 'Clarification',
    clarifyForApproval: 'Clarification',
    approve: 'Approval',
    postComment: 'Comment only',
    rejectApproval: "Cancel status",
    rejectInspection: "Cancel status"
  }
};
Action.headerLabel = 'Optional comment';

let EmptyLayout = {
  message: {
    assignedTasks: "At the moment you don't have any invoice to inspect, approve or in clarification state.",
    processedTasks: "At the moment you don't have any processed invoices."
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
