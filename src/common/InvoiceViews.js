/**
 * Enum-like implementation of the application views storage.
 */
class InvoiceViews  {

  constructor({ name, path }) {
    this.name = name;
    this.path = path;
  }

  /**
   * Initializes view instances.
   *
   * @param views - {Object} with properties of form <view name>:<view path>
   * @return {InvoiceViews}
   */
  static init(views) {
    this.views = [];
    for (let key in views) {
      if (views.hasOwnProperty(key)) {
        const viewInstance = new InvoiceViews({ name: key, path: views[key] });
        this.views.push(viewInstance);
        this[key] = viewInstance;
      }
    }
    return this;
  }

  static getByPath(path) {
    return this.views.filter(view => view.path === path)[0];
  }

  toString() {
    return this.name;
  }
}

module.exports = InvoiceViews.init({
  ALL_TASKS: '/invoice/list',
  MY_TASKS: '/invoice/tasks/active',
  PROCESSED_TASKS: '/invoice/tasks/processed',
  EMPTY_VIEW: '/invoice/tasks/notFound',
  IMPORT: '/invoice/import',
  MATCHING: '/invoice/matching'
});
