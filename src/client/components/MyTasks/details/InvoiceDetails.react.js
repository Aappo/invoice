import React, { Component, PropTypes } from 'react';
import { formattedTotalSum } from '../../../utils/MathUtils';
import InvoiceForm from '../../InvoiceReceiptEditor/components/InvoiceEditor/InvoiceForm.react';
import InvoiceItemsPricePanel from '../../InvoiceReceiptEditor/components/InvoiceEditor/InvoiceItemsPricePanel.react';

export default class InvoiceDetails extends Component {

  static propTypes = {
    invoice: PropTypes.object.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    termsOfDelivery: PropTypes.array.isRequired,
    termsOfPayment: PropTypes.array.isRequired,
    methodsOfPayment: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired
  };

  calculateItemsPrice(invoice) {
    let totalNetPrice, totalTaxAmount, totalGrossPrice;
    if (invoice.items.length > 0) {
      totalNetPrice = formattedTotalSum(this.context.i18n, invoice.items, 'totalNetPrice');
      totalTaxAmount = formattedTotalSum(this.context.i18n, invoice.items, 'taxAmount');
      totalGrossPrice = formattedTotalSum(this.context.i18n, invoice.items, 'totalGrossPrice');
    }
    return {
      currency: invoice.currencyId,
      totalNetPrice: isNaN(totalNetPrice) ? 0 : totalNetPrice,
      totalTaxAmount: isNaN(totalTaxAmount) ? 0 : totalTaxAmount,
      totalGrossPrice: isNaN(totalGrossPrice) ? 0 : totalGrossPrice
    }
  }

  render() {
    const { invoice } = this.props;
    return (
      <div id="oc-invoices-my-tasks-wide-invoice-details">
        <InvoiceForm
          readOnly={true}
          invoice={invoice}
          customer={invoice.customer}
          supplier={invoice.supplier}
          supplierAddresses={invoice.supplierAddresses}
          supplierContacts={invoice.supplierContacts}

          termsOfDelivery={this.context.termsOfDelivery}
          termsOfPayment={this.context.termsOfPayment}
          methodsOfPayment={this.context.methodsOfPayment}
          currencies={this.context.currencies}

          statusLabel={statusId => statusId}
          onSave={() => {}}
          displayMode={'one-column'}
        />
        <InvoiceItemsPricePanel
          readOnly={true}
          priceInfo={this.calculateItemsPrice(invoice)}
          onAddPositions={() => {}}
        />
      </div>
    )
  }

}
