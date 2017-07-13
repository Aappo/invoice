import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Router from 'react-router/lib/Router';
import I18nContext from '../components/util/I18nContext.react';
import UserInfoProvider from '../components/util/UserInfoProvider.react';
import { Route, Redirect, IndexRedirect } from 'react-router';
import Layout from '../containers/Layout.react';
import {InvoiceOverview}from '../components/InvoiceReceiptEditor';
import InvoiceImport from '../containers/InvoiceImport.react';

const ApprovalApplication = ({ locale, formatPatterns, userData }) => (
  <I18nContext locale={locale} formatPatterns={formatPatterns}>
    <UserInfoProvider>
      <Router history={browserHistory}>
        <Route component={Layout} path="/invoice">
          <IndexRedirect to="/invoice/approval"/>
          <Route path="/invoice/approval" component={InvoiceOverview}/>
          <Route path="/invoice/import" component={InvoiceImport}/>
        </Route>
      </Router >
    </UserInfoProvider>
  </I18nContext>
);

ApprovalApplication.propTypes = {
  locale: PropTypes.string.isRequired,
  formatPatterns: React.PropTypes.object
};

export default ApprovalApplication;

