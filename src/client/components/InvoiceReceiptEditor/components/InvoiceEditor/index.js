import './InvoiceEditor.less';
import React, { Component, PropTypes } from 'react';
import SplitScreenEditor from './SplitScreenEditor.react';
import SelectCustomerWizard from './SelectCustomerWizard';
import SimpleEditor from './SimpleEditor.react';
import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';
import _ from 'lodash';
import messages from '../../i18n/InvoiceEditor';
import { formattedTotalSum } from '../../../../utils/MathUtils';
import {
  fetchInvoiceReceipt,
  fetchInvoiceReceiptItems,
  fetchCustomer,
  fetchCustomers,
  fetchSupplier,
  fetchSupplierAddresses,
  fetchSupplierContacts,
  fetchTermsOfDelivery,
  fetchTermsOfPayment,
  fetchMethodsOfPayment,
  fetchCurrencies
} from '../../common/fetchers';

/**
 * Creates invoice editor higher order component providing basic invoice operations.
 *
 * @param WrappedEditorComponent - component to be wrapped
 * @returns {InvoiceEditor}
 */
const createInvoiceEditor = (WrappedEditorComponent) => {

  return class InvoiceEditor extends Component {

    static propTypes = {
      invoiceId: PropTypes.number,
      createMode: PropTypes.bool,
      onCancel: PropTypes.func
    };

    static contextTypes = {
      i18n: PropTypes.object.isRequired,
      router: PropTypes.object.isRequired,
      currentUserData: PropTypes.object.isRequired,
      showNotification: PropTypes.func.isRequired
    };

    static defaultProps = {
      createMode: false,
    };

    constructor(props) {
      super(props);
      this.state = {
        invoice: {},
        isMasterDataReady: false,
        isInvoiceDataReady: false,
        statuses: [
          { 'statusId': '070', 'description': 'rejected' },
          { 'statusId': '100', 'description': 'created' },
          { 'statusId': '390', 'description': 'approved' },
          { 'statusId': '400', 'description': 'transferred' },
          { 'statusId': '800', 'description': 'deleted' },
          { 'statusId': '820', 'description': 'registered' }
        ],
        statusLabel: (statusId) => {
          let status = _.find(this.state.statuses, { statusId: statusId });
          return status ? status.description : statusId;
        }
      };
    }

    componentWillMount() {
      this.context.i18n.register('InvoiceEditor', messages);
      this._loadMasterData();
      if (!this.props.createMode && this.props.invoiceId) {
        this._loadInvoiceData(this.props.invoiceId);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.createMode && nextProps.invoiceId !== this.props.invoiceId) {
        if (nextProps.invoiceId) {
          this._loadInvoiceData(nextProps.invoiceId);
        } else {
          this._unloadInvoiceData();
        }
      }
    }

    _loadMasterData() {
      return Promise.props({
        termsOfDelivery: fetchTermsOfDelivery(),
        termsOfPayment: fetchTermsOfPayment(),
        methodsOfPayment: fetchMethodsOfPayment(),
        currencies: fetchCurrencies(),
        customers: fetchCustomers(),
        isMasterDataReady: true
      }).then((masterData) => this.setState(masterData));
    }

    _loadInvoiceData(invoiceId) {
      return Promise.resolve(this.context.showNotification('Messages.loadingData')
      ).then(() => fetchInvoiceReceipt(invoiceId)
      ).then((invoice) =>
        Promise.props({
          invoice: invoice,
          customer: fetchCustomer(invoice.customerId),
          supplier: fetchSupplier(invoice.supplierId),
          isInvoiceDataReady: true
        })
      ).then((invoiceData) => Promise.resolve(this.setState(invoiceData, () => this.calculateItemsPrice()))
      ).catch((error) => {
        this.context.showNotification('Messages.loadingDataError', 'error', 10, false);
        throw Error(error);
      })
    }

    _unloadInvoiceData() {
      const newState = _.omit(this.state, ['invoice', 'customer', 'supplier', 'items']);
      newState.isInvoiceDataReady = false;
      this.setState(newState);
    }

    initInvoiceData(customerId) {
      return Promise.props({
        invoice: {
          supplierId: this.context.currentUserData.supplierid,
          customerId: customerId,
          statusId: _.find(this.state.statuses, { statusId: '100' }).statusId,
          intrastatId: '000',
          bookingDate: new Date()
        },
        supplier: fetchSupplier(this.context.currentUserData.supplierid),
        supplierAddresses: fetchSupplierAddresses(this.context.currentUserData.supplierid),
        supplierContacts: fetchSupplierContacts(this.context.currentUserData.supplierid),
        customer: fetchCustomer(customerId),
        isInvoiceDataReady: true
      }).then((invoiceData) => this.setState(invoiceData));
    }

    updateInvoice(payload, reset) {
      return request.put(`/invoice/api/invoices/${this.state.invoice.key}`).set(
        'Accept', 'application/json'
      ).send(payload).then((response) => Promise.resolve(response.body)
      ).then((invoice) => Promise.resolve(this.setState({ invoice: invoice }))
      ).then(() => this.context.showNotification('Labels.saved', 'success')
      ).catch((error) => {
        this.context.showNotification('Labels.notSaved', 'error', 10);
        throw Error(error);
      });
    }

    createInvoice(payload, reset) {
      return request.post(`/invoice/api/invoices`).set(
        'Accept', 'application/json'
      ).send(_.assign({}, this.state.invoice, payload)
      ).then((response) => Promise.resolve(reset())
      ).then(() => this.context.showNotification('Labels.saved', 'success')
      ).catch((error) => {
        this.context.showNotification('Labels.notSaved', 'error', 10);
        throw Error(error);
      });
    }

    calculateItemsPrice() {
      return fetchInvoiceReceiptItems(this.state.invoice.key).then((items) => {
        let totalNetPrice, totalTaxAmount, totalGrossPrice;
        if (items.length !== 0) {
          totalNetPrice = formattedTotalSum(this.context.i18n, items, 'totalNetPrice');
          totalTaxAmount = formattedTotalSum(this.context.i18n, items, 'taxAmount');
          totalGrossPrice = formattedTotalSum(this.context.i18n, items, 'totalGrossPrice');
        }
        this.setState({
          itemsPriceInfo: {
            currency: this.state.invoice.currencyId,
            totalNetPrice: isNaN(totalNetPrice) ? 0 : totalNetPrice,
            totalTaxAmount: isNaN(totalTaxAmount) ? 0 : totalTaxAmount,
            totalGrossPrice: isNaN(totalGrossPrice) ? 0 : totalGrossPrice,
          }
        });
      });
    }

    render() {
      if (this.state.isMasterDataReady) {
        if (this.state.isInvoiceDataReady) {
          return (
            <WrappedEditorComponent
              {...this.props}

              updateInvoice={::this.updateInvoice}
              createInvoice={::this.createInvoice}
              calculateItemsPrice={::this.calculateItemsPrice}

              invoice={this.state.invoice}
              itemsPriceInfo={this.state.itemsPriceInfo}
              customer={this.state.customer}
              supplier={this.state.supplier}
              supplierAddresses={this.state.supplierAddresses}
              supplierContacts={this.state.supplierContacts}
              termsOfDelivery={this.state.termsOfDelivery}
              termsOfPayment={this.state.termsOfPayment}
              methodsOfPayment={this.state.methodsOfPayment}
              currencies={this.state.currencies}
              statusLabel={this.state.statusLabel}
            />
          )
        } else {
          return this.props.createMode ?
            <SelectCustomerWizard
              customers={this.state.customers}
              onSubmit={(customerId) => this.initInvoiceData(customerId)}
            /> : null;
        }
      } else {
        return null;
      }
    }
  }
};

const SimpleInvoiceEditor = createInvoiceEditor(SimpleEditor);
const SplitScreenInvoiceEditor = createInvoiceEditor(SplitScreenEditor);

export { SimpleInvoiceEditor, SplitScreenInvoiceEditor };
