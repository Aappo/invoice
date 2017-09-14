import React, {PropTypes, Component} from 'react';
import { fetchInvoiceAttachmentsInfo } from '../../../../MyTasks/data/fetchers';
import InvoiceDetailsDataHandler from '../InvoiceDetailsDataHandler';
import AttachmentDetailsView from './AttachmentDetailsView.react';

const AttachmentDetails = ({invoice}) => (
  <InvoiceDetailsDataHandler
    invoice={invoice}
    fetchData={(invoice) => fetchInvoiceAttachmentsInfo(invoice.id)}
    renderView={({invoice, fetchResult}) => <AttachmentDetailsView attachments={fetchResult} invoice={invoice}/>}
  />
);

AttachmentDetails.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default AttachmentDetails;
