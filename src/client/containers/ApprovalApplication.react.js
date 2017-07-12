import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Router from 'react-router/lib/Router';
import I18nContext from '../components/util/I18nContext.react';
import UserInfoProvider from '../components/util/UserInfoProvider.react';
import { Route, Redirect } from 'react-router';
import Layout from '../containers/Layout.react';

const ApprovalApplication = ({ locale, formatPatterns }) => (
  <I18nContext locale={locale} formatPatterns={formatPatterns}>
    <UserInfoProvider>
      <Router history={browserHistory}>
        <Route component={Layout} path="/invoice/">
          <Redirect from="/" to="/approval"/>
          <Route path="/invoice/approval" component={"12312312312"}/>
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

