import React, { PropTypes } from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import { fetchApprovalTasks, fetchInvoiceReceipt, fetchCustomer, fetchSupplier } from '../components/MyTasks/data/fetchers';
import InvoiceImport from '../containers/InvoiceImport.react';
import TaskListLayoutHandler from '../components/MyTasks/layouts/TaskListLayoutHandler.react';
import TaskLayoutHandler from '../components/MyTasks/layouts/TaskLayoutHandler.react';
import EmptyLayout from '../components/MyTasks/layouts/EmptyLayout.react';
import Promise from 'bluebird';

/**
 * Loads customer and supplier information and injects them to each task.
 *
 * @param tasks - list of tasks
 * @returns {Promise} resolving list of tasks with injected tenants
 */
const withTenants = tasks => {
  return Promise.all(tasks.map(task =>
    Promise.props({
      customer: fetchCustomer(task.customerId),
      supplier: fetchSupplier(task.supplierId)
    }).then(tenants => Object.assign(task, tenants))
  )).then(() => Promise.resolve(tasks))
};

/**
 * View displaying all invoices assigned to the customer.
 */
const AllTaskList = (props) => (
  <TaskListLayoutHandler fetcher={ () => fetchApprovalTasks({}).then(tasks => withTenants(tasks)) } />
);

/**
 * View displaying invoices which have available transitions for current user.
 */
const TaskList = (props) => {
  return (
    <TaskListLayoutHandler
      fetcher={ () => fetchApprovalTasks({searchParams: {assignedToMe: true}}).then(tasks => withTenants(tasks)) }
      filter={ invoice => invoice.transitions.length > 0 }
    />
  );
};

TaskList.contextTypes = {
  userData: PropTypes.object.isRequired
};

/**
 * View displaying all invoices processed by current user.
 */
const ProcessedList = (props, { userData }) => {
  const filter = (invoice) => invoice.inspectedBy === userData.id || invoice.approvedBy === userData.id;
  return (
    <TaskListLayoutHandler
      fetcher={ () => fetchApprovalTasks({searchParams: {processedByMe: true}}).then(tasks => withTenants(tasks)) }
      filter={filter}
    />
  )
};

ProcessedList.contextTypes = {
  userData: PropTypes.object.isRequired
};

/**
 * View displaying one single task.
 *
 * @param invoiceId
 */
const TaskView = ({ params: { invoiceId } }) => {
  return (
    <TaskLayoutHandler
      fetcher={ () => fetchInvoiceReceipt(invoiceId).then(task => Promise.resolve([task])).then(tasks => withTenants(tasks)) }
    />
  )
};

TaskView.propTypes = {
  params: PropTypes.object.isRequired
};

export default (props, context) => (
  <Route component={Layout} path="/invoice">
    <IndexRedirect to="/invoice/taskList"/>
    <Route path="/invoice/import" component={InvoiceImport}/>
    <Route path="/invoice/allTaskList" component={AllTaskList}/>
    <Route path="/invoice/taskList" component={TaskList}/>
    <Route path="/invoice/task/:invoiceId" component={TaskView}/>
    <Route path="/invoice/processed" component={ProcessedList}/>
    <Route path="/invoice/notFound" component={EmptyLayout}/>
  </Route>
);
