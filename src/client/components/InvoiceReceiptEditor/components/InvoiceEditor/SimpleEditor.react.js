import React, { Component, PropTypes } from 'react';
import InvoiceForm from './InvoiceForm.react';
import InvoiceItemsPricePanel from './InvoiceItemsPricePanel.react';

export default class SimpleEditor extends Component {

  static propTypes = {
    invoiceId: PropTypes.number,
    createMode: PropTypes.bool,
    onCancel: PropTypes.func,

    /* Props injected from higher order component (marked as not required) */
    updateInvoice: PropTypes.func,
    createInvoice: PropTypes.func,
    invoice: PropTypes.object,
    itemsPriceInfo: PropTypes.object,
    customer: PropTypes.object,
    supplier: PropTypes.object,
    supplierAddresses: PropTypes.array,
    supplierContacts: PropTypes.array,
    termsOfDelivery: PropTypes.array,
    termsOfPayment: PropTypes.array,
    methodsOfPayment: PropTypes.array,
    currencies: PropTypes.array,
    statusLabel: PropTypes.func,
    displayMode: PropTypes.oneOf(['one-column', 'two-column'])
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  render() {
    const { createMode } = this.props;
    return (
      <div className={`${createMode ? 'create' : 'edit'}-invoice`}>
        <InvoiceForm
          formHeader={createMode ? this.context.i18n.getMessage('Labels.createIR') : ''}
          invoice={this.props.invoice}
          customer={this.props.customer}
          supplier={this.props.supplier}
          supplierAddresses={this.props.supplierAddresses}
          supplierContacts={this.props.supplierContacts}

          termsOfDelivery={this.props.termsOfDelivery}
          termsOfPayment={this.props.termsOfPayment}
          methodsOfPayment={this.props.methodsOfPayment}
          currencies={this.props.currencies}

          statusLabel={this.props.statusLabel}
          onCancel={this.props.onCancel}
          onSave={createMode ? this.props.createInvoice : this.props.updateInvoice}
          displayMode={createMode ? 'two-column' : 'one-column'}
        />
        <br/>
        {!createMode ?
          <InvoiceItemsPricePanel
            priceInfo={this.props.itemsPriceInfo}
            onAddPositions={() => (this.context.router.push(`/invoice/edit/${this.props.invoiceId}/items`))}
          /> : null}
      </div>
    )
  }
}
