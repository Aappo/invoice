import React, { Component, PropTypes } from 'react';
import UiHelpers from '../helpers/UIHelpers.react';
import './TaskItem.less';
import moment from 'moment';
import { INVOICE_FLAG } from '../constants'

const iconSize = {
  width: 25,
  height: 25,
};

/**
 * Returns pending badge in case dueDate == today || dueDate == tomorrow
 * Return outdated badge in case dueDate < today
 * Return no badge otherwise
 * @param dueDate
 */
const getDueDateBadge = (dueDate) => {
  const today = moment();
  const momentDueDate = moment(dueDate);

  if (momentDueDate.isSame(today, 'day') || momentDueDate.isSame(today.add(1, 'days'), 'day')) {
    return UiHelpers.getIconForInvoiceFlag(INVOICE_FLAG.DueDatePending, iconSize, {style: {fill: 'orange'}});
  } else if (momentDueDate.isBefore(today, 'day')) {
    return UiHelpers.getIconForInvoiceFlag(INVOICE_FLAG.DueDateOutdated, iconSize, {style: {fill: 'red'}});
  } else {
    return null
  }
};

const TaskItem = ({ invoice, showDueDateBadge }, { i18n }) => (
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
        <span className="value">
          {i18n.formatDate(invoice.dueDate)}{' '}{showDueDateBadge ? getDueDateBadge(invoice.dueDate) : ''}
        </span>
      </div>
      <div className="divider"/>
      <span className="value">
          {i18n.formatDecimalNumber(invoice.grossAmount)} {invoice.currencyId}
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
        {invoice.commentary ? UiHelpers.getIconForInvoiceFlag(INVOICE_FLAG.Commented, iconSize) : ''}
      </div>
      <div className="divider"/>
      <div className="list-item">
        {UiHelpers.getIconForApprovalStatus(invoice.status, iconSize)}
      </div>
    </div>
  </div>
);

TaskItem.propTypes = {
  invoice: PropTypes.object.isRequired,
  showDueDateBadge: PropTypes.bool
};

TaskItem.defaultProps = {
  showDueDateBadge: true
};

TaskItem.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default TaskItem;
