let TaskItem = {};
TaskItem.customerId = 'Payer Company';
TaskItem.supplierId = 'Supplier';
TaskItem.dueDate = 'Due Date';
TaskItem.status = {
  inspectionRequired: 'Review required',
  approvalRequired: 'Approval required',
  inspClrRequired: 'Clarification required',
  appClrRequired: 'Clarification required',
  archived: 'Archived',
  approved: 'Approved'
};

let MyTaskList = {};
MyTaskList.label = {
  sortBy: 'Sort by',
  dueDate: 'Due date',
  supplier: { supplierName: 'Supplier' },
  grossAmount: 'Gross amount'
};

let Action = {
  event: {
    inspect: 'Review',
    sendToClarification: 'Set to clarification',
    clarifyForInspection: 'Cancel clarification',
    clarifyForApproval: 'Cancel clarification',
    approve: 'Approve',
    postComment: 'Add',
    rejectApproval: "Cancel approval",
    rejectInspection: "Cancel review"
  },
  tab: {
    inspect: 'Review',
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
    assignedTasks: "At the moment you don't have any invoice to review, approve or in clarification state.",
    processedTasks: "At the moment you don't have any processed invoices."
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
  }
};

export default {
  Details: Details,
  TaskItem: TaskItem,
  MyTaskList: MyTaskList,
  Action: Action,
  EmptyLayout: EmptyLayout
};
