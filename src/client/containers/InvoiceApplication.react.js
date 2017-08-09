import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import {KeyInRoutes} from '../routes';
import Router from 'react-router/lib/Router';
import I18nContext from '../components/util/I18nContext.react';
import UserDataContext from '../components/util/UserDataContext.react';

const InvoiceApplication = ({ locale, formatPatterns, userData }) => (
  <I18nContext locale={locale} formatPatterns={formatPatterns}>
    <UserDataContext userData={userData}>
      <Router history={browserHistory}>
        {KeyInRoutes()}
      </Router >
    </UserDataContext>
  </I18nContext>
);

InvoiceApplication.propTypes = {
  locale: PropTypes.string.isRequired,
  formatPatterns: React.PropTypes.object
};

export default InvoiceApplication;

