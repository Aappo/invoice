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
        <span>{i18n.getMessage('TaskItem.customerId')}</span>
        <span className="value">{invoice.customerId}</span>
      </div>
      <div className="divider"/>
      <div className="list-item">
        <span>{i18n.getMessage('TaskItem.supplierId')}</span>
        <span className="value">
              {invoice.supplierId}
            </span>
      </div>
    </div>
    <div className="list-item-wide-column">
      <div className="list-item">
        <span>{i18n.getMessage('TaskItem.dueDate')}</span>
        <span className="value">
              {i18n.formatDate(invoice.dueDate)}
            </span>
      </div>
      <div className="divider"/>
      <div className="list-item">
        <span className="value">
          {i18n.getMessage(`TaskItem.status.${invoice.status}`)}
        </span>
        <span className="value">
          {UiHelpers.formatAmount(invoice.totalGrossPrice)} {invoice.currencyId}
        </span>
      </div>
    </div>
    <div className="list-item-narrow-column">
      {UiHelpers.getIconForApprovalStatus(invoice.status, iconSize)}
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
