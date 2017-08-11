import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import {KeyInRoutes} from '../routes';
import Router from 'react-router/lib/Router';
import InitialContextProvider from '../components/util/InitialContextProvider.react';

const InvoiceApplication = (props) => (
  <InitialContextProvider {...props}>
    <Router history={browserHistory}>
      {KeyInRoutes()}
    </Router >
  </InitialContextProvider>
);

InvoiceApplication.propTypes = {
  locale: PropTypes.string.isRequired,
  formatPatterns: React.PropTypes.object
};

export default InvoiceApplication;

