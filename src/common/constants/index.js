// TODO: Not very handy structure. Something enum-ish would be more applicable.
const INVOICE_VIEWS = {
  ALL_TASKS: { name: 'ALL_TASKS', path: '/invoice/allTaskList' },
  MY_TASKS: { name: 'MY_TASKS', path: '/invoice/taskList' },
  PROCESSED_TASKS: { name: 'PROCESSED_TASKS', path: '/invoice/processed' },
  EMPTY_VIEW: { name: 'EMPTY_VIEW', path: '/invoice/notFound' }
};

module.exports = {
  INVOICE_VIEWS: INVOICE_VIEWS
};
