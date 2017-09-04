import React from 'react';
import { Icon } from '@opuscapita/react-icons';

import {
  APPROVAL_STATUS,
  INVOICE_FLAG
} from '../constants';
import { INVOICE_VIEWS } from '../../../../common/constants';


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
   * Get view name associated with specified path.
   * If view isn't found result is undefined.
   *
   * @param path - path
   * @return {string} - view name
   */
  getViewForPath(path) {
    for (let view in INVOICE_VIEWS) {
      if (INVOICE_VIEWS.hasOwnProperty(view)) {
        if (INVOICE_VIEWS[view].path === path)
          return INVOICE_VIEWS[view].name;
      }
    }
  }

  /**
   * Get comparator function for specified invoice field.
   *
   * @param field - invoice field
   * @param revert - flag to revert comparison rule
   * @returns {function(*, *)}
   */
  getInvoiceComparator = (field, revert = false) => {
    return (first, second) => {
      let result;
      if (typeof first[field] === 'undefined' || first[field] === null) {
        if (typeof second[field] === 'undefined' || second[field] === null) {
          return 0;
        } else {
          return 1;
        }
      } else if (typeof second[field] === 'undefined' || second[field] === null) {
        return -1;
      } else if (typeof first[field] === 'number') {
        result = first[field] - second[field];
      } else if (typeof first[field] === 'string') {
        if (isNaN(Date.parse(first[field]))) {
          result = first[field].localeCompare(second[field]);
        } else {
          result = Date.parse(first[field]) - Date.parse(second[field]);
        }
      } else {
        throw new Error(`Unable to compare invoices by field '${field}'. Unsupported type.`);
      }
      return revert ? -result : result;
    }
  }
}

export default new UiHelpers();
