import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Router from 'react-router/lib/Router';
import UserDataProvider from '../components/util/UserDataProvider.react';
import I18nProvider from '../components/util/I18nProvider.react';
import { ApprovalRoutes } from '../routes';

const ApprovalApplication = (props) => (
  <UserDataProvider userData={props.userData}>
    <I18nProvider formatPatterns={props.formatPatterns}>
      <Router history={browserHistory}>
        {ApprovalRoutes()}
      </Router >
    </I18nProvider>
  </UserDataProvider>
);

ApprovalApplication.propTypes = {
  formatPatterns: React.PropTypes.object.isRequired
};

export default ApprovalApplication;

