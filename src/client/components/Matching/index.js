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

const withTenants = invoice => {
  return Promise.props({
    customer: fetchCustomer(invoice.customerId),
    supplier: fetchSupplier(invoice.supplierId)
  }).then(tenants => Object.assign(invoice, tenants));
};

const withMatchingInfo = invoice => {
  return fetchMatchingTaskInfo(invoice.id).then(info => Object.assign(invoice, { matching: info }));
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
