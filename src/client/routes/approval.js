import React, { PropTypes } from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import { fetchApprovalTasks } from '../components/MyTasks/data/fetchers';
import InvoiceImport from '../containers/InvoiceImport.react';
import TaskLayoutHandler from '../components/MyTasks';

const AllTaskList = (props) => (
  <TaskLayoutHandler  options={{ fetcher: () => fetchApprovalTasks({}) }} />
);

const TaskList = (props) => (
  <TaskLayoutHandler
    options={{
      fetcher: () => fetchApprovalTasks({ searchParams: { assignedToMe: true } }),
      filter: (invoice) => invoice.transitions.length > 0
    }}
  />
);

const ProcessedList = (props, { userData }) => {
  const filter = (invoice) => invoice.inspectedBy === userData.id || invoice.approvedBy === userData.id;
  return (
    <TaskLayoutHandler options={{ fetcher: () => fetchApprovalTasks({}).filter(filter), filter }} />
  )
};

ProcessedList.contextTypes = {
  userData: PropTypes.object.isRequired
};

export default (props, context) => (
  <Route component={Layout} path="/invoice">
    <IndexRedirect to="/invoice/taskList"/>
    <Route path="/invoice/import" component={InvoiceImport}/>
    <Route path="/invoice/allTaskList" component={AllTaskList}/>
    <Route path="/invoice/taskList" component={TaskList}/>
    <Route path="/invoice/processed" component={ProcessedList}/>
  </Route>
);
