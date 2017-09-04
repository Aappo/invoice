const { Enum } = require('enumify');

class InvoiceViews extends Enum {

  static getByPath(path) {
    return this.enumValues.find(value => value.path === path);
  }
}

InvoiceViews.initEnum({
  ALL_TASKS: { get path() { return '/invoice/allTaskList' } },
  MY_TASKS: { get path() { return '/invoice/taskList' } },
  PROCESSED_TASKS: { get path() { return '/invoice/processed' } },
  EMPTY_VIEW: { get path() { return '/invoice/notFound' } },
});

module.exports = InvoiceViews;
