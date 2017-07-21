import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import {InvoiceOverview}from '../components/InvoiceReceiptEditor';
import InvoiceImport from '../containers/InvoiceImport.react';
import { MyTasksView, AllTasksView } from '../components/MyTasks';

export default () => (
  <Route component={Layout} path="/invoice">
    <IndexRedirect to="/invoice/taskList"/>
    <Route path="/invoice/import" component={InvoiceImport}/>
    <Route path="/invoice/allTaskList" component={AllTasksView}/>
    <Route path="/invoice/taskList" component={MyTasksView}/>
  </Route>
);
