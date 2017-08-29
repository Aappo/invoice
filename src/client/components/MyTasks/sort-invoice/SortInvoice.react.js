import React, { PropTypes, Component } from 'react';
import Select from '@opuscapita/react-select';
import './SortInvoice.less';

const SortInvoice = ({ value, onChange}, {i18n}) => {
  const items = [
    { value: 'dueDate', label: i18n.getMessage('MyTaskList.label.dueDate') },
    { value: 'supplierId', label: i18n.getMessage('MyTaskList.label.supplier') },
    { value: 'grossAmount', label: i18n.getMessage('MyTaskList.label.grossAmount') }
  ];

  return (
    <div className="oc-invoices-sort-invoice">
      <span className="oc-invoices-sort-invoice-label">
        {i18n.getMessage('MyTaskList.label.sortBy')}
      </span>
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
};

SortInvoice.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

SortInvoice.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default SortInvoice;
