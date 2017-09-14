import React, { PropTypes } from 'react';
import { Route, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import { fetchApprovalTasks, fetchInvoiceReceipt } from '../components/MyTasks/data/fetchers';
import InvoiceImport from '../containers/InvoiceImport.react';
import TaskListLayoutHandler from '../components/MyTasks/layouts/TaskListLayoutHandler.react';
import TaskLayoutHandler from '../components/MyTasks/layouts/TaskLayoutHandler.react';
import EmptyLayout from '../components/MyTasks/layouts/EmptyLayout.react';
import Promise from 'bluebird';
import InvoiceGrid from '../components/InvoiceGrid';
import MatchingView from '../components/Matching';
import InvoiceViews from '../../common/InvoiceViews';
// import { TaskList, ProcessedList, TaskView } from '../components/MyTasks'; // Uncomment for updated versions

/**
 * View displaying invoices which have available transitions for current user.
 */
const TaskList = (props) => {
  return (
    <TaskListLayoutHandler
      fetcher={ () => fetchApprovalTasks({
        searchParams: { assignedToMe: true
        }
      })}
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
      fetcher={ () => fetchApprovalTasks({
        searchParams: {
          processedByMe: true
        }
      })}
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
    <IndexRedirect to={InvoiceViews.MY_TASKS.path}/>
    <Route path={InvoiceViews.IMPORT.path} component={InvoiceImport}/>
    <Route path={InvoiceViews.ALL_TASKS.path} component={InvoiceGrid}/>
    <Route path={InvoiceViews.MY_TASKS.path} component={TaskList}/>
    <Route path={InvoiceViews.PROCESSED_TASKS.path} component={ProcessedList}/>
    <Route path={InvoiceViews.MATCHING.path} component={MatchingView}/>
    <Route path={InvoiceViews.EMPTY_VIEW.path} component={EmptyLayout}/>
    <Route path="/invoice/tasks/:invoiceId" component={TaskView}/>
  </Route>
);
