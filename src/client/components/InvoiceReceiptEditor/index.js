import React from 'react';
import InvoiceOverview from './components/InvoiceOverview';
import { SimpleInvoiceEditor, SplitScreenInvoiceEditor } from './components/InvoiceEditor';
import InvoiceItemEditor from './components/InvoiceItemEditor';

const InvoiceCreator = (props) => <SimpleInvoiceEditor {...props} createMode={true}/>;

export {
  InvoiceOverview,
  InvoiceCreator,
  SimpleInvoiceEditor,
  SplitScreenInvoiceEditor,
  InvoiceItemEditor
};
