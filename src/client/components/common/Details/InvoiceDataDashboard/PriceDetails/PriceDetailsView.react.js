import React, { PropTypes } from 'react';

const PriceDetailsView = ({ invoice, currency }, { i18n }) => (
  <div className="oc-invoices-card">
    <div>
      <span className="oc-invoices-card-title">
        <span className="oc-invoices-card-title">
          {i18n.getMessage('Details.totals.grossAmount')}
        </span>
      </span>
      <span className="oc-invoices-card-value">
          {i18n.formatDecimalNumber(invoice.grossAmount)}
        </span>
    </div>
    <div>
      <span className="oc-invoices-card-title">
        {i18n.getMessage('Details.totals.netAmount')}
      </span>
      <span className="oc-invoices-card-value">
          {i18n.formatDecimalNumber(invoice.netAmount)}
        </span>
    </div>
    <div>
      <span className="oc-invoices-card-title">
        {i18n.getMessage('Details.totals.vatAmount')}
      </span>
      <span className="oc-invoices-card-value">
          {i18n.formatDecimalNumber(invoice.vatAmount)}
        </span>
    </div>
    <div>
      <span className="oc-invoices-card-title">
        {i18n.getMessage('Details.totals.currency')}
      </span>
      <span className="oc-invoices-card-value">
          {currency.id}
      </span>
    </div>
  </div>
);

PriceDetailsView.propTypes = {
  invoice: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired
};

PriceDetailsView.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default PriceDetailsView;
