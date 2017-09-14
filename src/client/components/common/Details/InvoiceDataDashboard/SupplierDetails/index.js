import React, { PropTypes, Component } from 'react';
import { fetchSupplierBankAccounts } from '../../../../MyTasks/data/fetchers';
import Promise from 'bluebird';
import SupplierDetailsView from './SupplierDetailsView.react'
import InvoiceDetailsDataHandler from '../InvoiceDetailsDataHandler';

const fetchSupplierData = (invoice) => Promise.props({
  supplier: invoice.supplier,
  bankAccounts: fetchSupplierBankAccounts(invoice.supplier.supplierId)
});

const SupplierDetails = ({ invoice }) => (
  <InvoiceDetailsDataHandler
    invoice={invoice}
    fetchData={(invoice) => fetchSupplierData(invoice)}
    renderView={({ invoice, fetchResult }) =>
      <SupplierDetailsView
        supplier={fetchResult.supplier}
        bankAccounts={fetchResult.bankAccounts}
      />}
  />
);

SupplierDetails.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default SupplierDetails;
