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
    return this.views.find(view => view.path === path);
  }
}

module.exports = InvoiceViews.init({
  ALL_TASKS: '/invoice/allTaskList',
  MY_TASKS: '/invoice/taskList',
  PROCESSED_TASKS: '/invoice/processed',
  EMPTY_VIEW: '/invoice/notFound'
});
