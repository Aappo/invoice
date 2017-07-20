import React, { Component, PropTypes } from 'react';
import { formattedTotalSum } from '../../../utils/MathUtils';
import InvoiceForm from '../../InvoiceReceiptEditor/components/InvoiceEditor/InvoiceForm.react';
import InvoiceItemsPricePanel from '../../InvoiceReceiptEditor/components/InvoiceEditor/InvoiceItemsPricePanel.react';

const InvoiceDetails = (
  { invoice },
  { i18n, termsOfDelivery, termsOfPayment, methodsOfPayment, currencies }
) => {

  const calculateItemsPrice = () => {
    let totalNetPrice, totalTaxAmount, totalGrossPrice;
    if (invoice.items.length > 0) {
      totalNetPrice = formattedTotalSum(i18n, invoice.items, 'totalNetPrice');
      totalTaxAmount = formattedTotalSum(i18n, invoice.items, 'taxAmount');
      totalGrossPrice = formattedTotalSum(i18n, invoice.items, 'totalGrossPrice');
    }
    return {
      currency: invoice.currencyId,
      totalNetPrice: isNaN(totalNetPrice) ? 0 : totalNetPrice,
      totalTaxAmount: isNaN(totalTaxAmount) ? 0 : totalTaxAmount,
      totalGrossPrice: isNaN(totalGrossPrice) ? 0 : totalGrossPrice
    }
  };

  return (
    <div id="oc-invoices-my-tasks-wide-invoice-details">
      <InvoiceForm
        readOnly={true}
        invoice={invoice}
        customer={invoice.customer}
        supplier={invoice.supplier}
        supplierAddresses={invoice.supplierAddresses}
        supplierContacts={invoice.supplierContacts}

        termsOfDelivery={termsOfDelivery}
        termsOfPayment={termsOfPayment}
        methodsOfPayment={methodsOfPayment}
        currencies={currencies}

        statusLabel={statusId => statusId}
        onSave={() => {
        }}
        displayMode={'one-column'}
      />
      <InvoiceItemsPricePanel
        readOnly={true}
        priceInfo={calculateItemsPrice()}
        onAddPositions={() => {
        }}
      />
    </div>
  )
};

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired
};

InvoiceDetails.contextTypes = {
  i18n: PropTypes.object.isRequired,
  termsOfDelivery: PropTypes.array.isRequired,
  termsOfPayment: PropTypes.array.isRequired,
  methodsOfPayment: PropTypes.array.isRequired,
  currencies: PropTypes.array.isRequired
};

export default InvoiceDetails;
