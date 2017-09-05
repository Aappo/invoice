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

export const SORTING_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC'
};

export const VIEW_SORTING_RULES = {
  MY_TASKS: [
    { field: 'dueDate', order: SORTING_ORDER.ASC },
    { field: 'supplierId', order: SORTING_ORDER.ASC },
    { field: 'grossAmount', order: SORTING_ORDER.ASC }
  ],
  PROCESSED_TASKS: [
    { field: 'dueDate', order: SORTING_ORDER.DESC },
    { field: 'supplierId', order: SORTING_ORDER.ASC },
    { field: 'grossAmount', order: SORTING_ORDER.ASC }
  ]
};
