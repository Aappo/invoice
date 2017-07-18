/* eslint-disable no-param-reassign */

import { forEach } from 'lodash';

import { INVOICECATEGORY,
         STATUSES } from './Invoices.constants';


class ModelUtils {

  flattenQueueResponse = (queue) => {
    let flattenedResp = [];
    forEach(queue, (status, statusKey) => {
      forEach(status, (invoice) => {
        invoice.id = `${INVOICECATEGORY[statusKey]}-${invoice.InvId}`;
        invoice.Status = STATUSES[statusKey];
        if (invoice.Flags.indexOf(20) !== -1) {
          invoice.Status = STATUSES.InClarification;
        }
        flattenedResp.push(invoice);
      });
    });
    return flattenedResp;
  }
}

export default new ModelUtils();
