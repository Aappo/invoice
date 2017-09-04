import React from 'react';
import InvoiceGrid from './InvoiceGrid.react';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider, intlReducer } from 'react-intl-redux';
import { datagridReducer } from '@opuscapita/react-grid';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({
    intl: intlReducer,
    datagrid: datagridReducer,
  }),
  compose(applyMiddleware(thunk)),
);

/**
 * Redux configuration, required for react-grid
 *
 * TODO: ask for moving into 'react-grid' module
 * @author Daniel Zhitomirsky
 */
export default () => (
  <Provider store={store}>
    <IntlProvider>
      <InvoiceGrid/>
    </IntlProvider>
  </Provider>
);
