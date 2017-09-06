import React from 'react';
import { Icon } from '@opuscapita/react-icons';
import _ from 'lodash';

import {
  APPROVAL_STATUS,
  INVOICE_FLAG,
  SORTING_ORDER
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
      /* Only in clarification and commented icons in demo */
      // case APPROVAL_STATUS.Approved:
      //   indicator = 'ok';
      //   break;
      // case APPROVAL_STATUS.Inspected:
      //   indicator = 'inspected';
      //   break;
      // case APPROVAL_STATUS.InspectionRequired:
      //   indicator = 'flagged';
      //   break;
      // case APPROVAL_STATUS.InspectedAndApproved:
      //   indicator = 'inspectedAndApproved';
      //   break;
      case APPROVAL_STATUS.InspectorClarificationRequired:
        indicator = 'inClarification';
        break;
      case APPROVAL_STATUS.ApproverClarificationRequired:
        indicator = 'inClarification';
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
   * Get comparator function for specified invoice field.
   *
   * @param field - invoice field (notation for nested properties is also supported f.e. 'supplier.supplierName')
   * @param order - comparison rule order
   * @returns {function(*, *)}
   */
  getInvoiceComparator = (field, order = SORTING_ORDER.ASC) => {
    return (first, second) => {
      const firstValue = _.get(first, field), secondValue = _.get(second, field);
      let result;
      if (typeof firstValue === 'undefined' || firstValue === null) {
        if (typeof secondValue === 'undefined' || secondValue === null) {
          return 0;
        } else {
          return 1;
        }
      } else if (typeof secondValue === 'undefined' || secondValue === null) {
        return -1;
      } else if (typeof firstValue === 'number') {
        result = firstValue - secondValue;
      } else if (typeof firstValue === 'string') {
        if (isNaN(Date.parse(firstValue))) {
          result = firstValue.localeCompare(secondValue);
        } else {
          result = Date.parse(firstValue) - Date.parse(secondValue);
        }
      } else {
        throw new Error(`Unable to compare invoices by field '${field}'. Unsupported type.`);
      }
      return order === SORTING_ORDER.DESC ? -result : result;
    }
  }
}

export default new UiHelpers();
