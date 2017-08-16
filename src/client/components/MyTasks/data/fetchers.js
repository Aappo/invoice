import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';

export const fetchInvoiceReceipts = () => {
  return request.get(`/invoice/api/invoices`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchApprovalTasks = ({searchParams, offset = 0, count = 10000}) => {
  return request.get('/invoice/api/approval/tasks').query(
    searchParams
  ).query({
    offset: offset,
    count: count
  }).then((response) => Promise.resolve(response.body)).catch((error) => {
    throw Error(error);
  })
};

export const fetchTaskActions = (id) => {
  return request.get(`/invoice/api/approval/events/${id}`).then((response) => {
    return Promise.resolve(response.body)
  }).catch((error) => {
    throw Error(error);
  })
};

export const sendInvoiceEvent = (id, event, comment) => {
  return request.post(`/invoice/api/approval/events/${id}/${event}`).set(
    'Accept', 'application/json'
  ).send({comment}).then((response) => {
    return Promise.resolve(response.body)
  }).catch((error) => {
    throw Error(error);
  })
};

export const fetchInvoiceReceipt = (id) => {
  return request.get(`/invoice/api/invoices/${id}`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchInvoiceReceiptItems = (id) => {
  return request.get(`/invoice/api/invoices/${id}/items`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchCustomer = (id) => {
  return request.get(`/customer/api/customers/${id}`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchCustomers = () => {
  return request.get(`/customer/api/customers`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchSupplier = (id) => {
  return request.get(`/supplier/api/suppliers/${id}`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchSupplierAddresses = (id) => {
  return request.get(`/supplier/api/suppliers/${id}/addresses`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchSupplierContacts = (id) => {
  return request.get(`/supplier/api/suppliers/${id}/contacts`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchTermsOfDelivery = () => {
  return request.get('/invoice/api/termsOfDelivery').set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchTermsOfPayment = () => {
  return request.get('/invoice/api/termsOfPayment').set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchMethodsOfPayment = () => {
  return request.get('/invoice/api/methodOfPayment').set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchCurrencies = () => {
  return request.get('/isodata/currencies').set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(Object.keys(response.body).map(key => response.body[key]))
  ).catch((error) => { throw Error(error); })
};

export const fetchUnitsOfMeasure = () => {
  return request.get(`/invoice/api/unitsOfMeasure`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};

export const fetchInvoiceStatuses = () => {
  return request.get(`/invoice/api/statuses/invoice`).set(
    'Accept', 'application/json'
  ).then((response) => Promise.resolve(response.body)
  ).catch((error) => { throw Error(error); })
};
