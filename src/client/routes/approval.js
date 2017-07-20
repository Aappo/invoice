import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import {InvoiceOverview}from '../components/InvoiceReceiptEditor';
import InvoiceImport from '../containers/InvoiceImport.react';
import MyTasksView from '../components/MyTasks';

export default () => (
  <Route component={Layout} path="/invoice">
    <IndexRedirect to="/invoice/approval"/>
    <Route path="/invoice/approval" component={
      () => <InvoiceOverview readOnly={true}/>
    }/>
    <Route path="/invoice/import" component={InvoiceImport}/>
    <Route path="/invoice/taskList" component={MyTasksView}/>
  </Route>
);