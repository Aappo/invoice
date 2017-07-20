import React, { Component } from 'react';
import Promise from 'bluebird';
import {
  fetchTaskActions,
  fetchApprovalTasks,
  fetchInvoiceReceipt,
  fetchCustomer,
  fetchSupplier,
  fetchSupplierContacts,
  fetchSupplierAddresses
} from './data/fetchers';
import _ from 'lodash';

export default function withDataHandler(WrappedComponent) {
  class DataHandler extends Component {

    state = {
      taskList: [],
      invoice: {}
    };

    componentDidMount() {
      fetchApprovalTasks({}).then((invoces) => {
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

    loadInvoice(id) {
      return fetchInvoiceReceipt(id).cath((err) => {
        console.error(err);
        throw Error(err);
      })
    }

    loadInvoiceData(id) {
      return fetchInvoiceReceipt(id).then((invoice) => {
        return Promise.props({
          ...invoice,
          customer: fetchCustomer(invoice.customerId),
          supplier: fetchSupplier(invoice.supplierId),
          supplierContacts: fetchSupplierContacts(invoice.supplierId),
          supplierAddresses: fetchSupplierAddresses(invoice.supplierId),
          transitions: fetchTaskActions(invoice.key)
        })
      })
    }

    getInvoice(id) {
      return this.loadInvoiceData(id).then((invoice) => {
        this.setState({invoice})
      }).catch((err) => {
        throw Error(err);
      })
    }

    /**
     * id - is the invoice (or task key to update and the updater -
     * is the function to call for invoice, invoice with 'id' will be
     * passed to it as an argument)
     * @param id
     * @param updater
     */
    updateInvoice(id, updater) {
      return Promise.resolve(
        updater(
          _.find(this.state.taskList, {key: id})
        )
      ).then(() => {
        return Promise.props({
          invoice: fetchInvoiceReceipt(id),
          invoiceData: this.loadInvoiceData(id)
        }).then(({invoice, invoiceData}) => {
          this.setState({
            invoice: invoiceData,
            taskList: _.map(this.state.taskList, (task) => {
              return task.key === id? invoice : task
            })
          })
        })
      }).catch((err) => {
        console.error(err);
        throw Error(err);
      })
    }

    render() {
      return (
        <WrappedComponent
          list={this.state.taskList}
          invoice={this.state.invoice}
          getInvoice={::this.getInvoice}
          updateInvoice={::this.updateInvoice}
        />
      );
    }
  }

  return DataHandler;
}
