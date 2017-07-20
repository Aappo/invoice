import React from 'react';
// import { Icon } from '@opuscapita/oc-common-ui';

import { APPROVALACTIONKIND,
         INVOICESTATUSFLAG } from '../models/Invoices.constants';


/** UiHelpers class. A collection of common UI methods in invoices. */
class UiHelpers {

  /**
   * Get icon for approval status
   * @param {string} status - Status name.
   * @param {object} size - Icon size i.e. width and height.
   */
  getIconForApprovalStatus = (status, size) => {
    return null;
    let indicator = '';

    switch (status) {
      case APPROVALACTIONKIND.Approved:
        indicator = 'ok';
        break;
      case APPROVALACTIONKIND.Inspected:
        indicator = 'inspected';
        break;
      case APPROVALACTIONKIND.InspectedAndApproved:
        indicator = 'inspectedAndApproved';
        break;
      case APPROVALACTIONKIND.Rejected:
        indicator = 'rejected';
        break;
      case APPROVALACTIONKIND.SetToClarification:
        indicator = 'inClarification';
        break;
      default:
        break;
    }
    if (indicator) {
      return <Icon type="indicator" name={indicator} {...size} />;
    }
    return null;
  }

  /**
   * Get icon for invoice flag
   * @param {string} flag - Status flag (INVOICESTATUSFLAG).
   * @param {object} size - Icon size i.e. width and height.
   */
  getIconForInvoiceFlag = (flag, size) => {
    return null;
    let indicator = '';

    switch (flag) {
      case INVOICESTATUSFLAG.COMMENTED:
        indicator = 'commented';
        break;
      case INVOICESTATUSFLAG.FLAGGED_MANUALLY:
        indicator = 'flagged';
        break;
      case INVOICESTATUSFLAG.FLAGGED_AUTOMATICALLY:
        indicator = 'flagged';
        break;
      case INVOICESTATUSFLAG.RECLAMATIONS_SENT:
        indicator = 'email';
        break;
      case INVOICESTATUSFLAG.ACCEPTED:
        indicator = 'ok';
        break;
      case INVOICESTATUSFLAG.HOLD:
        indicator = 'inClarification';
        break;
      case INVOICESTATUSFLAG.REJECTED:
        indicator = 'rejected';
        break;
      case INVOICESTATUSFLAG.INVOICE_INSPECTED:
        indicator = 'inspected';
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
        />
      );
    }
    return null;
  }

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
  }

  /**
   * Format amount
   * @param {number} amount - Amount.
   * @param {string} currency - Currency according to format the amount
   */
  formatAmount = (amount, currency, options) => {
    return amount;
  }
}

export default new UiHelpers();
