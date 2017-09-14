import React, {PropTypes, Component} from 'react';
import { fetchCurrency } from '../../../../MyTasks/data/fetchers';
import InvoiceDetailsDataHandler from '../InvoiceDetailsDataHandler';
import PriceDetailsView from './PriceDetailsView.react';

const PriceDetails = ({invoice}) => (
  <InvoiceDetailsDataHandler
    invoice={invoice}
    fetchData={(invoice) => fetchCurrency(invoice.currencyId)}
    renderView={({invoice, fetchResult}) => <PriceDetailsView invoice={invoice} currency={fetchResult}/>}
  />
);

PriceDetails.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default PriceDetails;
