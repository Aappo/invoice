import React, { PropTypes } from 'react';
import './supplierDetails.less';

const supplierDetailsFields = [
  'supplierId',
  'supplierName'
];

const SupplierDetailsView = ({ supplier, bankAccounts }, { i18n }) => (
  <div className="oc-invoices-card">
    {supplierDetailsFields.map((fieldName) => (
      <div key={fieldName}>
        <span className="oc-invoices-card-title">
          {i18n.getMessage(`Details.supplier.${fieldName}`)}
        </span>
        <span className="oc-invoices-card-value">
          {supplier[fieldName]}
        </span>
      </div>
    ))}
    <div key='bankAccountNumber'>
      <span className="oc-invoices-card-title">
        {i18n.getMessage('Details.supplier.bankAccountNumber')}
      </span>
      <span className="oc-invoices-card-value">
        {bankAccounts.length > 0? bankAccounts[0].accountNumber : i18n.getMessage('Details.supplier.noBankAccountData')}
      </span>
    </div>
  </div>
);

SupplierDetailsView.propTypes = {
  supplier: PropTypes.object.isRequired,
  bankAccounts: PropTypes.array.isRequired
};

SupplierDetailsView.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default SupplierDetailsView;
