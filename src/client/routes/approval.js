import React, { PropTypes } from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import { fetchApprovalTasks } from '../components/MyTasks/data/fetchers';
import InvoiceImport from '../containers/InvoiceImport.react';
import TaskLayoutHandler from '../components/MyTasks';
import EmptyLayout from '../components/MyTasks/EmptyLayout.react';

const AllTaskList = (props, { i18n }) => (
  <TaskLayoutHandler
    options={{
      fetcher: () => fetchApprovalTasks({}),
      renderFallback: (isLoading) =>
        <EmptyLayout message={ i18n.getMessage('EmptyLayout.message.assignedTasks') } isLoading={ isLoading } />
    }}
  />
);

const TaskList = (props, { i18n }) => (
  <TaskLayoutHandler
    options={{
      fetcher: () => fetchApprovalTasks({ searchParams: { assignedToMe: true } }),
      filter: (invoice) => invoice.transitions.length > 0,
      renderFallback: (isLoading) =>
        <EmptyLayout message={ i18n.getMessage('EmptyLayout.message.assignedTasks') } isLoading={ isLoading } />
    }}
  />
);

const ProcessedList = (props, { i18n, userData }) => {
  const filter = (invoice) => invoice.inspectedBy === userData.id || invoice.approvedBy === userData.id;
  return (
    <TaskLayoutHandler
      options={{
        fetcher: () => fetchApprovalTasks({}).filter(filter),
        filter,
        renderFallback: (isLoading) =>
          <EmptyLayout message={ i18n.getMessage('EmptyLayout.message.processedTasks') } isLoading={ isLoading } />
      }}
    />
  )
};

AllTaskList.contextTypes = {
  i18n: PropTypes.object.isRequired
};

TaskList.contextTypes = {
  i18n: PropTypes.object.isRequired
};

ProcessedList.contextTypes = {
  i18n: PropTypes.object.isRequired,
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
