export const APPROVAL_STATUS= {
  None: 0,
  InspectionRequired: 'inspectionRequired',
  Approved: 'approved',
  Inspected: 'approvalRequired',
  InspectorClarificationRequired: 'inspClrRequired',
  ApproverClarificationRequired: 'appClrRequired',
  InspectedAndApproved: 'archived'
};

export const INVOICE_FLAG = {
  Commented: 'commented',
  DueDatePending: 'alert',
  DueDateOutdated: 'error'
};

export const COMMENTARY_MAX_SIZE = 2000;
