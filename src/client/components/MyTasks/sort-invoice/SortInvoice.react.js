import React, { PropTypes } from 'react';

import './SortInvoice.less';

const Select = require('react-select');

function SortInvoice({ label, value, items, onChange, ...props }) {
  return (
    <div className="oc-invoices-sort-invoice" {...props}>
      <span className="oc-invoices-sort-invoice-label">Sort by</span>
      <Select
        className="oc-invoices-sort-invoice-select"
        value={value}
        searchable={false}
        options={items}
        onChange={onChange}
      />
    </div>
  );
}

SortInvoice.defaultProps = {
  label: null,
};

SortInvoice.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number,
      value: PropTypes.string,
      text: PropTypes.string,
    },
  )).isRequired,
};

export default SortInvoice;
