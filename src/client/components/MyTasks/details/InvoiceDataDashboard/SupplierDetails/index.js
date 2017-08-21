import React, {PropTypes, Component} from 'react';
import { fetchSupplier } from '../../../data/fetchers';
import SupplierDetailsView from './SupplierDetailsView.react'
import InvoiceDetailsDataHandler from '../InvoiceDetailsDataHandler';

const SupplierDetails = ({invoice}) => (
  <InvoiceDetailsDataHandler
    invoice={invoice}
    fetchData={(invoice) => fetchSupplier(invoice.supplierId)}
    renderView={({invoice, fetchResult}) => <SupplierDetailsView supplier={fetchResult}/>}
  />
);

SupplierDetails.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default SupplierDetails;
