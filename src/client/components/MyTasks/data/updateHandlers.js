import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';

export const updateInvoiceHandler = (invoiceId, payload) => {
  return request.put(`/invoice/api/invoices/${invoiceId}`).set(
    'Accept', 'application/json'
  ).send(payload).then((response) => Promise.resolve(response.body)
  ).catch((error) => {
    throw Error(error);
  });
};

/**
 * Update invoice commentary co
 *
 * @param invoiceId
 * @param commentDescriptor {message: '..', event: '..'}
 * @return {Promise.<TResult>}
 */
export const updateInvoiceCommentHandler = (invoiceId, commentDescriptor) => {
  return request.put(`/invoice/api/invoices/${invoiceId}/comment`).set(
    'Accept', 'application/json'
  ).send(commentDescriptor).then((response) => Promise.resolve(response.body)
  ).catch((error) => {
    throw Error(error);
  });
};

export const sendInvoiceEventHandler = (id, event) => {
  return request.post(`/invoice/api/approval/events/${id}/${event}`).set(
    'Accept', 'application/json'
  ).then((response) => {
    return Promise.resolve(response.body)
  }).catch((error) => {
    throw Error(error);
  })
};
