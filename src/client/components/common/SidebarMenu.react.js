import React from 'react';
import { Link } from 'react-router';

/**
 * OpusCaputa sidebar menu
 * Parent component should be body (or at least span - otherwise height won't be 100%)
 */
const SidebarMenu = () => (
  <section className="sidebar">
    <nav className="navbar navbar-default">
      <div className="nav-background"/>
      <div className="navbar-header hidden-md">
        <a className="navbar-brand visible-lg" href="#">
          <img src="/invoice/static/img/oc-logo-white.svg" style={{ height: '1.4em' }}/>
        </a>
      </div>
      <ul className="nav navbar-nav">
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
    </nav>
  </section>
);

export default SidebarMenu;
