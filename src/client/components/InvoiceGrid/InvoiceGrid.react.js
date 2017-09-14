import React, { PropTypes } from 'react';
import { Datagrid } from '@opuscapita/react-grid';
import columns from './columns';
import { connect } from 'react-redux';
import { INVOICE_GRID } from './constants';
import { loadInvoiceData } from './actions';

import './InvoiceGrid.less';

const mapDispatchToProps = {
  loadInvoiceData: loadInvoiceData
};

/**
 * Rendering part of invoice grid
 *
 * @author Daniel Zhitomirsky
 */
const InvoiceGrid = ({ loadInvoiceData }, { i18n }) => {
  loadInvoiceData();

  return (
    <div id="all-invoices-grid">
      <Datagrid id={INVOICE_GRID} columns={columns(i18n)}/>
    </div>
  );
};

InvoiceGrid.propTypes = {
  loadInvoiceData: PropTypes.func.isRequired
};

InvoiceGrid.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(InvoiceGrid);
