import React, { Component, PropTypes } from 'react';
import Promise from 'bluebird';
import withDataHandler from './data/DataHandler.react';
import MatchingLayout from './layouts/MatchingLayout.react';
import {
  fetchMatchingTask,
  fetchMatchingTasks,
  fetchMatchingTaskInfo
} from './data/fetchers';
import {
  fetchCustomer,
  fetchSupplier,
  fetchInvoiceReceipt
} from '../MyTasks/data/fetchers'; // TODO: Move all common fetchers to common directory
import messages from '../MyTasks/i18n'; // TODO: How to share bundle between these views?

const withTenants = task => {
  return Promise.props({
    customer: fetchCustomer(task.customerId),
    supplier: fetchSupplier(task.supplierId)
  }).then(tenants => Object.assign(task, tenants));
};

/**
 * Save current matching information for invoice in 'matching' property.
 *
 * @param task
 * @return {Promise.<TResult>}
 */
const withMatchingInfo = task => {
  return fetchMatchingTaskInfo(task.id).then(info => Object.assign(task, { matching: info }));
};

export default class MatchingView extends Component {

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.context.i18n.register('Matching', messages);
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(nextContext.i18n.locale !== this.context.i18n.locale){
      nextContext.i18n.register('Matching', messages);
    }
  }

  render() {
    return React.createElement(withDataHandler(MatchingLayout, {
      fetchers: {
        task: (id) => fetchMatchingTask(id).then(withTenants).then(withMatchingInfo),
        list: () => fetchMatchingTasks({}).then(tasks =>
          Promise.all(tasks.map(task => withTenants(task).then(withMatchingInfo)))),
        invoice: (id) => fetchInvoiceReceipt(id).then(withTenants).then(withMatchingInfo)
      },
      filter: task => task.matching.matched !== task.matching.total
    }));
  }

}

