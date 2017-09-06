import React, { PropTypes } from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import { fetchApprovalTasks, fetchInvoiceReceipt, fetchCustomer, fetchSupplier } from '../components/MyTasks/data/fetchers';
import InvoiceImport from '../containers/InvoiceImport.react';
import TaskListLayoutHandler from '../components/MyTasks/layouts/TaskListLayoutHandler.react';
import TaskLayoutHandler from '../components/MyTasks/layouts/TaskLayoutHandler.react';
import EmptyLayout from '../components/MyTasks/layouts/EmptyLayout.react';
import Promise from 'bluebird';
import InvoiceGrid from '../components/InvoiceGrid';
import MatchingItemsLayout from
  '../components/Matching/layouts/MatchingItemsLayout.react';

/**
 * View displaying invoices which have available transitions for current user.
 */
const TaskList = (props) => {
  return (
    <TaskListLayoutHandler
      fetcher={ () => fetchApprovalTasks({searchParams: {assignedToMe: true}}) }
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
      fetcher={ () => fetchApprovalTasks({searchParams: {processedByMe: true}}) }
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
      fetcher={ () => fetchInvoiceReceipt(invoiceId).then(task => Promise.resolve([task])) }
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
    <Route path="/invoice/allTaskList" component={InvoiceGrid}/>
    <Route path="/invoice/taskList" component={TaskList}/>
    <Route path="/invoice/task/:invoiceId" component={TaskView}/>
    <Route path="/invoice/matching" component={MatchingItemsLayout}/>
    <Route path="/invoice/processed" component={ProcessedList}/>
    <Route path="/invoice/notFound" component={EmptyLayout}/>
  </Route>
);
