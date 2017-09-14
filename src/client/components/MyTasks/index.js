import React, { PropTypes } from 'react';
import { fetchApprovalTasks, fetchTaskActions } from './data/fetchers';
import { fetchInvoiceReceipt, fetchCustomer, fetchSupplier } from '../common/data/fetchers';
import { SORTING_ORDER } from './constants';
import UIHelpers from '../util/UIHelpers.react';
import LayoutHandler from './layouts/LayoutHandler.react';
import InvoiceLayout from './layouts/InvoiceLayout.react';
import withDataHandler from '../common/data/DataHandler.react';
import Promise from 'bluebird';

const withTenants = invoice => {
  return Promise.props({
    customer: fetchCustomer(invoice.customerId),
    supplier: fetchSupplier(invoice.supplierId)
  }).then(tenants => Object.assign(invoice, tenants));
};

const withTransitions = invoice => {
  return fetchTaskActions(invoice.id).then(transitions => Object.assign(invoice, { transitions }));
};

/**
 * View displaying invoices which have available transitions for current user.
 */
const TaskList = () => {

  return React.createElement(withDataHandler(
    LayoutHandler,
    {
      invoiceFetcher: (id) => fetchInvoiceReceipt(id).then(withTenants),
      listFetcher: () => fetchApprovalTasks({searchParams: {assignedToMe: true}}).then(invoices =>
        Promise.all(invoices.map(invoice => withTenants(invoice)))),
      withDetails: (invoice) => withTransitions(invoice),
      filter: invoice => invoice.transitions.length > 0
    }
  ));
};

/**
 * View displaying all invoices processed by current user.
 */
const ProcessedList = (props, { userData }) => {

  return React.createElement(withDataHandler(
    LayoutHandler,
    {
      invoiceFetcher: (id) => fetchInvoiceReceipt(id).then(withTenants),
      listFetcher: () => fetchApprovalTasks({searchParams: {processedByMe: true}}).then(invoices =>
        Promise.all(invoices.map(invoice => withTenants(invoice)))),
      withDetails: (invoice) => withTransitions(invoice),
      filter: (invoice) => invoice.inspectedBy === userData.id || invoice.approvedBy === userData.id,
      sorting: {
        field: 'dueDate', order: UIHelpers.getInvoiceComparator('dueDate', SORTING_ORDER.DESC)
      }
    }
  ));
};

ProcessedList.contextTypes = {
  userData: PropTypes.object.isRequired
};

/**
 * View displaying one single invoice.
 *
 * @param invoiceId
 */
const TaskView = ({ params: { invoiceId } }) => {
  return React.createElement(withDataHandler(
    InvoiceLayout,
    {
      invoiceFetcher: (id) => fetchInvoiceReceipt(id).then(withTenants),
      listFetcher: () => fetchInvoiceReceipt(invoiceId).then(withTenants).then(invoice => Promise.resolve([invoice])),
      withDetails: (invoice) => withTransitions(invoice)
    }
  ));
};

TaskView.propTypes = {
  params: PropTypes.object.isRequired
};

export { TaskList, ProcessedList, TaskView };
