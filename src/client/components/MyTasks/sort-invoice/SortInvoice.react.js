import React, { PropTypes } from 'react';
import Select from '@opuscapita/react-select';
import './SortInvoice.less';


function SortInvoice({ label, value, items, onChange, ...props }) {
  console.log(Select)
  return (
    <div className="oc-invoices-sort-invoice" {...props}>
      <span className="oc-invoices-sort-invoice-label">Sort by</span>
      <div className="oc-invoices-sort-invoice-select">
        <Select
          value={value}
          searchable={false}
          clearable={false}
          options={items}
          onChange={onChange}
        />
      </div>
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
