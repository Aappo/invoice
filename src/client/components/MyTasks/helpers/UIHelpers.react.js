import React from 'react';
import { Icon } from '@opuscapita/react-icons';

import {
  APPROVAL_STATUS,
  INVOICE_FLAG
} from '../constants';


/**
 * UiHelpers class.
 * A collection of common UI methods in invoices.
 */
class UiHelpers {

  /**
   * Get icon for approval status
   * @param {string} status - Status name.
   * @param {object} size - Icon size i.e. width and height.
   */
  getIconForApprovalStatus = (status, size) => {
    let indicator = '';

    switch (status) {
      case APPROVAL_STATUS.Approved:
        indicator = 'ok';
        break;
      case APPROVAL_STATUS.Inspected:
        indicator = 'inspected';
        break;
      case APPROVAL_STATUS.InspectionRequired:
        indicator = 'flagged';
        break;
      case APPROVAL_STATUS.InspectedAndApproved:
        indicator = 'inspectedAndApproved';
        break;
      case APPROVAL_STATUS.InspectorClarificationRequired:
        indicator = 'inClarification';
        break;
      case APPROVAL_STATUS.ApproverClarificationRequired:
        indicator = 'inClarification';
        break;
      case APPROVAL_STATUS.Commented:
        indicator = 'commented';
        break;
      default:
        break;
    }

    if (indicator) {
      return <Icon type="indicator" name={indicator} {...size} />;
    }
    return null;
  };

  getInvoiceImageControl = (invoiceId, file) => {
    if (!file) {
      return null;
    }

    const newFile = file.replace('invoice',
      `invoice${invoiceId}`);

    let mime = '';
    const extensionMatch = /\.(.*)$/;
    if (extensionMatch.test(file)) {
      mime = extensionMatch.exec(file)[1];
    }

    // Always display as pdf
    if (true || mime === 'pdf') {
      return (
        <object
          type="application/pdf"
          width="100%"
          name="invoice_image"
          height="100%"
          data={file}
          aria-label="Invoice image"
        />
      );
    }
    return (
      <iframe
        title="Invoice image"
        width="100%"
        name="invoice_image"
        height="100%"
        src={newFile}
      />
    );
  }

  /**
   * Get icon for invoice flag
   * @param {string} flag - Status flag (INVOICE_FLAG).
   * @param {object} size - Icon size i.e. width and height.
   */
  getIconForInvoiceFlag = (flag, size, props = {}) => {
    let indicator = '';

    switch (flag) {
      case INVOICE_FLAG.Commented:
        indicator = INVOICE_FLAG.Commented;
        break;
      case INVOICE_FLAG.DueDatePending:
        indicator = INVOICE_FLAG.DueDatePending;
        break;
      case INVOICE_FLAG.DueDateOutdated:
        indicator = INVOICE_FLAG.DueDateOutdated;
        break;
      default:
        break;
    }

    if (indicator) {
      return (
        <Icon
          key={flag}
          type="indicator"
          name={indicator}
          {...size}
          {...props}
        />
      );
    }
    return null;
  };

  getFormatOptions = (amount, currency) => {
    let digits = 2;
    if (currency === 'JPY') {
      digits = 0;
    }
    return {
      value: amount,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    };
  };

  /**
   * Format amount
   * @param {number} amount - Amount.
   * @param {string} currency - Currency according to format the amount
   */
  formatAmount = (amount, currency, options) => {
    return amount;
  }

  /**
   * Get comparator function for specified invoice field.
   *
   * @param field
   * @returns {function(*, *)}
   */
  getInvoiceComparator = field => {
    return (first, second) => {
      if (typeof first[field] === 'undefined' || first[field] === null) {
        if (typeof second[field] === 'undefined' || second[field] === null) {
          return 0;
        } else {
          return 1;
        }
      } else if (typeof second[field] === 'undefined' || second[field] === null) {
        return -1;
      } else if (typeof first[field] === 'number') {
        return first[field] - second[field];
      } else if (typeof first[field] === 'string') {
        if (isNaN(Date.parse(first[field]))) {
          return first[field].localeCompare(second[field]);
        } else {
          return Date.parse(second[field]) - Date.parse(first[field]); // Descending order for dates
        }
      }
      throw new Error(`Unable to compare invoices by field '${field}'. Unsupported type.`);
    }
  }
}

export default new UiHelpers();
