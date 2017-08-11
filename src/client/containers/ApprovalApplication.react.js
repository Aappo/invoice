import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Router from 'react-router/lib/Router';
import InitialContextProvider from '../components/util/InitialContextProvider.react';
import {ApprovalRoutes} from '../routes';

const ApprovalApplication = (props) => (
  <InitialContextProvider {...props}>
    <Router history={browserHistory}>
      {ApprovalRoutes()}
    </Router >
  </InitialContextProvider>
);

ApprovalApplication.propTypes = {
  locale: PropTypes.string.isRequired,
  formatPatterns: React.PropTypes.object
};

export default ApprovalApplication;

