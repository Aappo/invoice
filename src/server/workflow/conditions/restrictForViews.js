"use strict";

const InvoiceViews = require('../../../common/InvoiceViews');

/**
 * Applies a restriction depending on view the event was sent from.
 * Restriction is not applied if views aren't defined or request doesn't contain a referer.
 *
 * @param referer - url the event originated from
 * @param views - list of application views for which invoice to be restricted
 * @return {boolean}
 *
 * @author Anton Levchuk
 */
module.exports = ({ request: { referer }, views}) => {
  if (referer && views && views.length > 0) {
    return !views.some(view => {
      if (!InvoiceViews[view]) {
        throw new Error(`Error in 'restrictForViews' guard: view '${view}' is not found.`);
      }
      return referer.includes(InvoiceViews[view].path);
    })
  }
  return true;
};
