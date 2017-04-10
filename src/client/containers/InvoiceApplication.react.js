import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import configureStore from '../store';
import routes from '../routes';
import Router from 'react-router/lib/Router';
import I18nContext from '../components/util/I18nContext.react';

const InvoiceApplication = ({ locale, formatPatterns }) => (
  <Provider store={configureStore({})}>
    <I18nContext locale={locale} formatPatterns={formatPatterns}>
      <Router history={browserHistory}>
        {routes('')}
      </Router >
    </I18nContext>
  </Provider>
);

InvoiceApplication.propTypes = {
  locale: PropTypes.string.isRequired,
  formatPatterns: React.PropTypes.object
};

export default InvoiceApplication;
