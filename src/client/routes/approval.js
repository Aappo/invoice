import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import { fetchApprovalTasks } from '../components/MyTasks/data/fetchers';
import InvoiceImport from '../containers/InvoiceImport.react';
import TaskLayoutHandler from '../components/MyTasks';

const myTasksOptions = {
  fetcher: () => fetchApprovalTasks({ searchParams: { assignedToMe: true } }),
  filter: (invoice) => invoice.transitions.length > 0
};

export default () => (
  <Route component={Layout} path="/invoice">
    <IndexRedirect to="/invoice/taskList"/>
    <Route path="/invoice/import" component={InvoiceImport}/>
    <Route path="/invoice/allTaskList" component={TaskLayoutHandler}/>
    <Route path="/invoice/taskList" component={() => <TaskLayoutHandler options={myTasksOptions}/>} />
  </Route>
);
