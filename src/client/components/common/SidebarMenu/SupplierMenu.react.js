import React from 'react';
import { Link } from 'react-router';

export default () => (
  <ul className="main-menu">
    <li key="InvoiceOverview">
      <Link to="/invoice">
        Invoice Overview
      </Link>
    </li>
    <li key="CreateInvoice">
      <Link to="/invoice/create">
        Create Invoice Manually
      </Link>
    </li>
    <li key="InvoiceImport">
      <Link to="/invoice/import">
        Import Invoices
      </Link>
    </li>
    <li key="GLAccountEditor">
      <Link to="/invoice/glAccounts">
        GlAccounts
      </Link>
    </li>
  </ul>
);
