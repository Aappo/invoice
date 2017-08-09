import React from 'react';
import { Link } from 'react-router';

export default () => (
  <ul id="main-menu" className="main-menu">
    <li key="InvoiceImport">
      <Link to="/invoice/import">
        Import Invoices
      </Link>
    </li>
    <li key="AllTaskList">
      <Link to="/invoice/allTaskList">
        All Tasks List
      </Link>
    </li>
    <li key="TaskList">
      <Link to="/invoice/taskList">
        My Tasks List
      </Link>
    </li>
    <li key="Processed">
      <Link to="/invoice/processed">
        Processed
      </Link>
    </li>
  </ul>
);
