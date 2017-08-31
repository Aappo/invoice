import React, { Component, PropTypes } from 'react';
import UiHelpers from '../helpers/UIHelpers.react';
import './TaskItem.less';

const iconSize = {
  width: 25,
  height: 25,
};

const TaskItem = ({ invoice }, { i18n }) => (
  <div className="list-item-content">
    <div className="list-item-wide-column">
      <div className="list-item">
        <span className="value">{invoice.customer.customerName}</span>
      </div>
      <div className="divider"/>
      <div className="list-item">
        <span className="value">{invoice.supplier.supplierName}</span>
      </div>
      <div className="divider"/>
      <div className="list-item">
        <span className="value">{invoice.invoiceNo}</span>
      </div>
    </div>
    <div className="list-item-wide-column">
      <div className="list-item">
        <span className="value">{i18n.formatDate(invoice.dueDate)}</span>
      </div>
      <div className="divider"/>
      <span className="value">
          {UiHelpers.formatAmount(invoice.grossAmount)} {invoice.currencyId}
        </span>
      <div className="divider"/>
      <div className="list-item">
        <span className="value">
          {i18n.getMessage(`TaskItem.status.${invoice.status}`)}
        </span>
      </div>
    </div>
    <div className="list-item-narrow-column">
      <div className="list-item">
        {invoice.commentary ? UiHelpers.getIconForApprovalStatus('commented', iconSize) : ''}
      </div>
      <div className="divider"/>
      <div className="list-item">
        {UiHelpers.getIconForApprovalStatus(invoice.status, iconSize)}
      </div>
    </div>
  </div>
);

TaskItem.propTypes = {
  invoice: PropTypes.object.isRequired
};

TaskItem.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default TaskItem;
