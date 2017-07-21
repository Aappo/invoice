import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Router from 'react-router/lib/Router';
import I18nContext from '../components/util/I18nContext.react';
import UserInfoProvider from '../components/util/UserInfoProvider.react';
import {ApprovalRoutes} from '../routes';

const ApprovalApplication = ({ locale, formatPatterns, userData }) => (
  <I18nContext locale={locale} formatPatterns={formatPatterns}>
    <UserInfoProvider>
      <Router history={browserHistory}>
        {ApprovalRoutes()}
      </Router >
    </UserInfoProvider>
  </I18nContext>
);

ApprovalApplication.propTypes = {
  locale: PropTypes.string.isRequired,
  formatPatterns: React.PropTypes.object
};

export default ApprovalApplication;

