import React, { Component, PropTypes } from 'react';
import './MatchingItem.less';

const MatchingItem = ({ invoice }, { i18n }) => (
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
        <span className="value">
          {`${i18n.getMessage('TaskItem.invoiceNo')} ${invoice.invoiceNo}`}
        </span>
      </div>
      <div className="divider"/>
      <div className="list-item">
        <span className="value">
          {`${i18n.getMessage('TaskItem.purchaseOrderId')} ${invoice.purchaseOrderId}`}
        </span>
      </div>
    </div>
    <div className="list-item-wide-column">
      <div className="list-item">
        <span className="value">
          {i18n.formatDate(invoice.dueDate)}
        </span>
      </div>
      <div className="divider"/>
      <span className="value">
          {i18n.formatDecimalNumber(invoice.grossAmount)} {invoice.currencyId}
      </span>
      <div className="divider"/>
      <span className="value">
          {i18n.getMessage('TaskItem.matching')} {`(${invoice.matching.matched}/${invoice.matching.total})`}
      </span>
    </div>
  </div>
);

MatchingItem.propTypes = {
  invoice: PropTypes.object.isRequired
};

MatchingItem.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default MatchingItem;
