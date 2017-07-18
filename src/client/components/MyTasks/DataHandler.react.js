import React, { Component } from 'react';
import Promise from 'bluebird';
import mockInvoice from './data/invoice';
import ModelUtils from './models/Utils';
import {
  fetchInvoiceReceipts,
  fetchInvoiceReceipt,
  fetchCustomer,
  fetchSupplier,
  fetchSupplierContacts,
  fetchSupplierAddresses
} from './data/fetchers';

export default function withDataHandler(WrappedComponent) {
  class DataHandler extends Component {

    state = {
      taskList: [],
      invoice: {}
    };

    componentDidMount() {
      fetchInvoiceReceipts().then((invoces) => {
        if(invoces.length > 0) {
          return Promise.props({
            taskList: invoces,
            invoice: this.loadInvoiceData(invoces[0].key)
          }).then((result) => this.setState(result))
        } else {
          this.setState({taskList: invoces})
        }
      })
    }

    loadInvoiceData(id) {
      return fetchInvoiceReceipt(id).then((invoice) => {
        return Promise.props({
          ...invoice,
          customer: fetchCustomer(invoice.customerId),
          supplier: fetchSupplier(invoice.supplierId),
          supplierContacts: fetchSupplierContacts(invoice.supplierId),
          supplierAddresses: fetchSupplierAddresses(invoice.supplierId)
        })
      })
    }

    getInvoice(id) {
      return this.loadInvoiceData(id).then((invoice) => {
        this.setState({invoice})
      }).catch((err) => {
        throw Error(error)
      })
    }

    render() {
      // const queue = ModelUtils.flattenQueueResponse(
      //   require('./data/queue.json'));
      const invoice = mockInvoice(1);

      return (
        <WrappedComponent
          list={this.state.taskList}
          invoice={this.state.invoice}
          getInvoice={::this.getInvoice}
        />
      );
    }
  }

  return DataHandler;
}
