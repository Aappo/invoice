import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import messages from './i18n/InvoiceDetails';
import EditInvoiceMarkup from '../components/EditInvoice';
import { loadInvoice } from '../actions/invoice/load';
import { loadInvoiceMasterData } from '../actions/invoice/loadMasterData';
import { updateInvoice } from '../actions/invoice/update';
import { submit } from 'redux-form';
import { EDIT_INVOICE_FORM } from '../constants/forms';
import { EDIT_INVOICE, INVOICE_UNLOAD } from '../constants/invoice';
import statusLabel from '../utils/statusLabel';

@connect(
  state => ({
    invoice: state.editInvoice.invoice,
    items: state.editInvoice.items,
    customer: state.editInvoice.customer,
    supplier: state.editInvoice.supplier,
    termsOfDelivery: state.editInvoice.termsOfDelivery,
    termsOfPayment: state.editInvoice.termsOfPayment,
    methodsOfPayment: state.editInvoice.methodsOfPayment,
    currencies: state.editInvoice.currencies,
    statuses: state.statuses.invoice
  }),
  (dispatch) => {
    return {
      loadInvoice: (id) => {
        dispatch(loadInvoice(id))
      },
      loadInvoiceMasterData: () => {
        dispatch(loadInvoiceMasterData())
      },
      unloadInvoice: () => {
        dispatch({type: INVOICE_UNLOAD})
      },
      handleInvoiceHeaderFormSubmit: () => {
        dispatch(submit(EDIT_INVOICE_FORM))
      },
      handleUpdateInvoice: (invoice) => {
        dispatch(updateInvoice(invoice))
      },
      handleCancel: () => {
        dispatch({type: EDIT_INVOICE})
      }
    }
  }
)
export default class InvoiceDetails extends Component {
  static propTypes = {
    invoice: PropTypes.object,
    items: PropTypes.array,
    customer: PropTypes.object,
    supplier: PropTypes.object,
    termsOfDelivery: PropTypes.array,
    termsOfPayment: PropTypes.array,
    methodsOfPayment: PropTypes.array,
    currencies: PropTypes.array,
    statuses: PropTypes.array,
    params: PropTypes.object,

    loadInvoice: PropTypes.func.isRequired,
    loadInvoiceMasterData: PropTypes.func.isRequired,
    unloadInvoice: PropTypes.func.isRequired,
    handleInvoiceHeaderFormSubmit: PropTypes.func.isRequired,
    handleUpdateInvoice: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.context.i18n.register('InvoiceDetails', messages);
    this.props.loadInvoiceMasterData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.invoiceId !== this.props.invoiceId) {
      nextProps.invoiceId ? this.props.loadInvoice(nextProps.invoiceId) : this.props.unloadInvoice();
    }
  }

  componentDidUpdate() {
    if (this._isReadyForRendering()) {
      ReactDom.findDOMNode(this).scrollIntoView(true);
    }
  }

  _isReadyForRendering() {
    const { invoiceId, invoice, customer, supplier, termsOfDelivery, termsOfPayment, methodsOfPayment, currencies } = this.props;
    return invoiceId && invoice && customer && supplier && termsOfDelivery && termsOfPayment && methodsOfPayment && currencies
  }

  render() {
    const {router} = this.context;

    return this._isReadyForRendering() ?
      <EditInvoiceMarkup
        invoice={this.props.invoice}
        items={this.props.items}
        customer={this.props.customer}
        supplier={this.props.supplier}

        termsOfDelivery={this.props.termsOfDelivery}
        termsOfPayment={this.props.termsOfPayment}
        methodsOfPayment={this.props.methodsOfPayment}
        currencies={this.props.currencies}

        onInvoiceHeaderFormSubmit={this.props.handleInvoiceHeaderFormSubmit}
        onUpdateInvoice={this.props.handleUpdateInvoice}
        onCancel={this.props.handleCancel}
        onAddPositions={() => (router.push(`/invoice/edit/${this.props.invoiceId}/items`))}
        statusLabel={statusLabel.bind(null, this.props.statuses)}
      /> : null;
  }
}
