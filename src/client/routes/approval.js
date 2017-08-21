import React, { PropTypes } from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import { fetchApprovalTasks } from '../components/MyTasks/data/fetchers';
import InvoiceImport from '../containers/InvoiceImport.react';
import TaskLayoutHandler from '../components/MyTasks/layouts/TaskLayoutHandler.react';
import EmptyLayout from '../components/MyTasks/layouts/EmptyLayout.react';
import InvoiceContainer from '../components/MyTasks/layouts/InvoiceContainer.react';

const AllTaskList = (props) => (
  <TaskLayoutHandler fetcher={ () => fetchApprovalTasks({}) } />
);

const TaskList = (props, { userData }) => {
  const excludedStatuses = {
    'invoice-approver': ['approved'],
    'invoice-inspector': ['approvalRequired', 'approved']
  };
  const filterForRole = invoice => !userData.roles.some(role => {
    return excludedStatuses[role] && excludedStatuses[role].indexOf(invoice.status) !== -1
  });
  return (
    <TaskLayoutHandler
      fetcher={ () => fetchApprovalTasks({searchParams: {assignedToMe: true}}).filter(filterForRole) }
      filter={ invoice => invoice.transitions.length > 0 && filterForRole(invoice) }
    />
  );
};

TaskList.contextTypes = {
  userData: PropTypes.object.isRequired
};

const ProcessedList = (props, { userData }) => {
  const filter = (invoice) => invoice.inspectedBy === userData.id || invoice.approvedBy === userData.id;
  return (
    <TaskLayoutHandler fetcher={ () => fetchApprovalTasks({}).filter(filter) } filter={filter} />
  )
};

ProcessedList.contextTypes = {
  userData: PropTypes.object.isRequired
};

const SingleInvoice = (props) => {
  return (
    <InvoiceContainer
      options={{
        fetcher: () => fetchApprovalTasks({}),
        invoiceId: props.params.invoiceId,
      }}
    />);
};


export default (props, context) => (
  <Route component={Layout} path="/invoice">
    <IndexRedirect to="/invoice/taskList"/>
    <Route path="/invoice/import" component={InvoiceImport}/>
    <Route path="/invoice/allTaskList" component={AllTaskList}/>
    <Route path="/invoice/taskList" component={TaskList}/>
    <Route path="/invoice/single/:invoiceId" component={SingleInvoice}/>
    <Route path="/invoice/processed" component={ProcessedList}/>
    <Route path="/invoice/notFound" component={EmptyLayout}/>
  </Route>
);
