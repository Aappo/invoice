import { DatagridActions } from '@opuscapita/react-grid';
import {
  fetchInvoiceReceipts,
  fetchSupplier,
  fetchCustomer
} from '../MyTasks/data/fetchers'
import Promise from 'bluebird';
import { INVOICE_GRID } from './constants';

const { setData, setBusy, setReady } = DatagridActions;

/**
 * Action creator that loads invoice list and tenant data for each invoice
 * before loads 'setBusy' is dispatched. When all loads are completed 'setData' and 'setReady'
 * are dispatched correspondingly
 *
 * @return Promise
 * @author Daniel Zhitomirsky
 */
export const loadInvoiceData = () => {
  return (dispatch) => {
    return Promise.resolve(dispatch(setBusy(INVOICE_GRID))).then(() => {
      return fetchInvoiceReceipts().then((invoices) => {
        return Promise.all(invoices.map((invoice) => {
          return Promise.props({
            customer: fetchCustomer(invoice.customerId),
            supplier: fetchSupplier(invoice.supplierId),
            ...invoice
          })
        }))
      })
    }).then((invoicesWithTenants) => {
      return Promise.resolve(dispatch(setData(INVOICE_GRID, invoicesWithTenants)))
    }).then(() => {
      return Promise.resolve(dispatch(setReady(INVOICE_GRID)));
    })
  }
};
