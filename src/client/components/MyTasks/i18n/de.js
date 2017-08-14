let TaskItem = {};
TaskItem.customerId = 'Payer Company';
TaskItem.supplierId = 'Supplier';
TaskItem.dueDate = 'Due Date';
TaskItem.status = {
  inspectionRequired: 'Inspection Required',
  approvalRequired: 'Approval Required',
  inspClrRequired: 'Clarification Required',
  appClrRequired: 'Clarification Required',
  archived: 'Archived',
  approved: 'Approved'
};

let Action = {
  event: {
    inspect: 'Inspect',
    sendToClarification: 'Set to Clarification',
    clarifyForInspection: 'Cancel clarification',
    clarifyForApproval: 'Cancel clarification',
    approve: 'Approve',
    postComment: 'Add',
    rejectApproval: "Cancel Approval",
    rejectInspection: "Cancel Inspection"
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
