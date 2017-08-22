import React, { PropTypes, Component } from 'react';
import { fetchSupplier, fetchSupplierBankAccounts } from '../../../data/fetchers';
import Promise from 'bluebird';
import SupplierDetailsView from './SupplierDetailsView.react'
import InvoiceDetailsDataHandler from '../InvoiceDetailsDataHandler';

const fetchSupplierData = (supplierId) => Promise.props({
  supplier: fetchSupplier(supplierId),
  bankAccounts: fetchSupplierBankAccounts(supplierId)
});

const SupplierDetails = ({ invoice }) => (
  <InvoiceDetailsDataHandler
    invoice={invoice}
    fetchData={(invoice) => fetchSupplierData(invoice.supplierId)}
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
