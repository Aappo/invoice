import React, { Component, PropTypes } from 'react';
import Promise from 'bluebird';
import {
  fetchTaskActions,
  fetchApprovalTasks,
  fetchInvoiceReceipt,
  fetchCustomer,
  fetchSupplier,
  fetchSupplierContacts,
  fetchSupplierAddresses,
  fetchTermsOfDelivery,
  fetchTermsOfPayment,
  fetchMethodsOfPayment,
  fetchCurrencies,
  fetchInvoiceReceiptItems
} from './data/fetchers';
import _ from 'lodash';

export default function withDataHandler(WrappedComponent) {
  class DataHandler extends Component {

    static childContextTypes = {
      termsOfDelivery: PropTypes.array.isRequired,
      termsOfPayment: PropTypes.array.isRequired,
      methodsOfPayment: PropTypes.array.isRequired,
      currencies: PropTypes.array.isRequired,
    };

    state = {
      taskList: [],
      // Common data loaded once and set to context
      isMasterDataReady: false,
      termsOfDelivery: [],
      termsOfPayment: [],
      methodsOfPayment: [],
      currencies: []
    };

    getChildContext() {
      return {
        termsOfDelivery: this.state.termsOfDelivery,
        termsOfPayment: this.state.termsOfDelivery,
        methodsOfPayment: this.state.methodsOfPayment,
        currencies: this.state.currencies
      }
    }

    componentDidMount() {
      this.loadMasterData().then((masterData) => Promise.resolve(this.setState(masterData, () => {
        fetchApprovalTasks({}).then((invoices) => {
          return Promise.resolve(invoices.length > 0 && this.loadInvoiceData(invoices[0].key).then((invoiceData) => {
            this.setState({ taskList: invoices, invoice: invoiceData });
          }));
        })
      })));
    }

    loadMasterData() {
      return Promise.props({
        termsOfDelivery: fetchTermsOfDelivery(),
        termsOfPayment: fetchTermsOfPayment(),
        methodsOfPayment: fetchMethodsOfPayment(),
        currencies: fetchCurrencies(),
        isMasterDataReady: true
      });
    }

    loadInvoiceData(id) {
      return fetchInvoiceReceipt(id).then((invoice) => {
        return Promise.props({
          ...invoice,
          customer: fetchCustomer(invoice.customerId),
          supplier: fetchSupplier(invoice.supplierId),
          supplierContacts: fetchSupplierContacts(invoice.supplierId),
          supplierAddresses: fetchSupplierAddresses(invoice.supplierId),
          items: fetchInvoiceReceiptItems(invoice.key),
          transitions: fetchTaskActions(invoice.key)
        })
      })
    }

    getInvoice(id) {
      return this.loadInvoiceData(id).then((invoice) => {
        this.setState({ invoice })
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
          _.find(this.state.taskList, { key: id })
        )
      ).then(() => {
        return Promise.props({
          invoice: fetchInvoiceReceipt(id),
          invoiceData: this.loadInvoiceData(id)
        }).then(({ invoice, invoiceData }) => {
          this.setState({
            invoice: invoiceData,
            taskList: _.map(this.state.taskList, (task) => {
              return task.key === id ? invoice : task
            })
          })
        })
      }).catch((err) => {
        console.error(err);
        throw Error(err);
      })
    }

    getInvoice(id) {
      this.loadInvoiceData(id).then((invoice) => Promise.resolve(this.setState({ invoice: invoice })));
    }

    render() {
      return this.state.isMasterDataReady && (
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
