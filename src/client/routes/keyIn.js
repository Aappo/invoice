import React from 'react';
import { Route } from 'react-router';
import Layout from '../containers/Layout.react';
import { InvoiceOverview, InvoiceCreator, InvoiceItemEditor } from '../components/InvoiceReceiptEditor';
import InvoiceImport from '../containers/InvoiceImport.react';
import GLAccountEditor from '../containers/GLAccountEditor.react';

//deprecated and will be removed
export default () => (
  <Route component={Layout}>
    <Route path="/invoice" component={InvoiceOverview}/>
    <Route path="/invoice/create" component={InvoiceCreator}/>
    <Route path="/invoice/edit/:id/items" component={InvoiceItemEditor}/>
    <Route path="/invoice/import" component={InvoiceImport}/>
    <Route path="/invoice/glAccounts" component={GLAccountEditor}/>
  </Route>
);
