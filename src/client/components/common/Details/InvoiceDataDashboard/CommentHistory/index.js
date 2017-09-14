import React, {PropTypes, Component} from 'react';
import { fetchInvoiceComments } from '../../../../MyTasks/data/fetchers';
import InvoiceDetailsDataHandler from '../InvoiceDetailsDataHandler';
import CommentHistoryView from './CommentHistoryView.react';

const CommentHistory = ({invoice}) => (
  <InvoiceDetailsDataHandler
    invoice={invoice}
    fetchData={(invoice) => fetchInvoiceComments(invoice.id)}
    renderView={({invoice, fetchResult}) => <CommentHistoryView comments={fetchResult}/>}
  />
);

CommentHistory.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default CommentHistory;
