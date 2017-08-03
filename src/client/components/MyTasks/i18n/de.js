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
    postComment: 'Leave a Comment',
    rejectApproval: "Cancel Approval",
    rejectInspection: "Cancel Inspection"
  }
};
Action.header = 'Approval';
Action.headerLabel = 'Leave a comment';


export default {
  TaskItem: TaskItem,
  Action: Action
};
