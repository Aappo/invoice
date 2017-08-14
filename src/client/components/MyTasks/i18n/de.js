let TaskItem = {};
TaskItem.customerId = 'Customer';
TaskItem.supplierId = 'Supplier';
TaskItem.dueDate = 'Due Date';
TaskItem.status = {
  inspectionRequired: 'Inspection Required',
  approvalRequired: 'Approval Required',
  inspClrRequired: 'Inspector Clarification Required',
  appClrRequired: 'Approver Clarification Required',
  archived: 'Archived',
  approved: 'Approved'
};

let Action = {
  event: {
    inspect: 'Inspect',
    sendToClarification: 'Send To Clarification',
    clarifyForInspection: 'Clarify for Inspector',
    clarifyForApproval: 'Clarify for Approver',
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
    rejectApproval: "Rejection",
    rejectInspection: "Rejection"
  }
};
Action.headerLabel = 'Commentary';

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
