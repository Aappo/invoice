import React from 'react';
import { Link } from 'react-router';

export default () => (
  <ul id="main-menu" className="main-menu">
    <li key="InvoiceImport">
      <Link to="/invoice/import">
        Import Invoices
      </Link>
    </li>
    <li key="TaskList">
      <Link to="/invoice/taskList">
        My Tasks
      </Link>
    </li>
  </ul>
);
