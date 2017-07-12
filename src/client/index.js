import { InvoiceApplication, ApprovalApplication } from './containers';
import { render } from 'react-dom';
import React from 'react';

module.exports = {
  renderInvoiceApplication: function(domElement, props) {
    render(
      <InvoiceApplication {...props}/>,
      domElement
    );
  },

  renderApprovalApplication: (domElement, props) => {
    render(
      <ApprovalApplication {...props}/>,
      domElement
    );
  }
};
