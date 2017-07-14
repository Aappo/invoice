import React from 'react';
import InvoiceOverview from './components/InvoiceOverview';
import InvoiceItemEditor from './components/InvoiceItemEditor';
import { SimpleInvoiceEditor } from './components/InvoiceEditor';

const InvoiceCreator = (props) => <SimpleInvoiceEditor {...props} createMode={true}/>;

export {
  InvoiceOverview,
  InvoiceCreator,
  InvoiceItemEditor
};
