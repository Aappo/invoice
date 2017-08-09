import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Router from 'react-router/lib/Router';
import I18nContext from '../components/util/I18nContext.react';
import UserDataContext from '../components/util/UserDataContext.react';
import {ApprovalRoutes} from '../routes';

const ApprovalApplication = ({ locale, formatPatterns, userData }) => (
  <I18nContext locale={locale} formatPatterns={formatPatterns}>
    <UserDataContext userData={userData}>
      <Router history={browserHistory}>
        {ApprovalRoutes()}
      </Router >
    </UserDataContext>
  </I18nContext>
);

ApprovalApplication.propTypes = {
  locale: PropTypes.string.isRequired,
  formatPatterns: React.PropTypes.object
};

export default ApprovalApplication;

