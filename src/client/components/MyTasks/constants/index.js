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
  ASCENDING: 'ASC',
  DESCENDING: 'DESC'
};

export const VIEW_SORTING_RULES = {
  ALL_TASKS: [
    { field: 'dueDate', order: SORTING_ORDER.ASCENDING },
    { field: 'supplierId', order: SORTING_ORDER.ASCENDING },
    { field: 'grossAmount', order: SORTING_ORDER.ASCENDING }
  ],
  MY_TASKS: [
    { field: 'dueDate', order: SORTING_ORDER.ASCENDING },
    { field: 'supplierId', order: SORTING_ORDER.ASCENDING },
    { field: 'grossAmount', order: SORTING_ORDER.ASCENDING }
  ],
  PROCESSED_TASKS: [
    { field: 'dueDate', order: SORTING_ORDER.DESCENDING },
    { field: 'supplierId', order: SORTING_ORDER.ASCENDING },
    { field: 'grossAmount', order: SORTING_ORDER.ASCENDING }
  ]
};
