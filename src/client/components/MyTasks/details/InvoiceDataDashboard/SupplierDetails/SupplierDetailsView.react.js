import React, { PropTypes } from 'react';
import './supplierDetails.less';

const supplierDetailsFields = [
  'supplierName',
  'supplierId'
];

const SupplierDetailsView = ({ supplier }, { i18n }) => (
  <div>
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
  </div>
);

SupplierDetailsView.propTypes = {
  supplier: PropTypes.object.isRequired
};

SupplierDetailsView.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default SupplierDetailsView;


