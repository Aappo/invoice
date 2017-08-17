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
    postComment: 'Comment Only',
    rejectApproval: "Cancel Status",
    rejectInspection: "Cancel Status"
  }
};
Action.headerLabel = 'Optional comment';

let EmptyLayout = {
  message: {
    assignedTasks: "At the moment you don't have any invoice to inspect, approve or in clarification state.",
    processedTasks: "At the moment you don't have any processed invoices."
  }
};

export default {
  TaskItem: TaskItem,
  Action: Action,
  EmptyLayout: EmptyLayout
};
