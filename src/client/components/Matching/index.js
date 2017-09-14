import React from 'react';
import Promise from 'bluebird';
import withDataHandler from '../common/data/DataHandler.react';
import MatchingLayout from './layouts/MatchingLayout.react';
import {
  fetchMatchingTask,
  fetchMatchingTasks,
  fetchMatchingTaskInfo
} from './data/fetchers';
import {
  fetchCustomer,
  fetchSupplier
} from '../common/data/fetchers';

const withTenants = task => {
  return Promise.props({
    customer: fetchCustomer(task.customerId),
    supplier: fetchSupplier(task.supplierId)
  }).then(tenants => Object.assign(task, tenants));
};

const withMatchingInfo = task => {
  return fetchMatchingTaskInfo(task.id).then(info => Object.assign(task, { matching: info }));
};

const MatchingView = () => {

  return React.createElement(withDataHandler(
    MatchingLayout,
    {
      invoiceFetcher: (id) => fetchMatchingTask(id).then(withTenants).then(withMatchingInfo),
      listFetcher: () => fetchMatchingTasks({}).then(invoices =>
        Promise.all(invoices.map(invoice => withTenants(invoice).then(withMatchingInfo)))),
      filter: invoice => invoice.matching.match !== invoice.matching.total
    }
  ));
};

export default MatchingView;
