import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import InvoiceDataDashboard from '../details/InvoiceDataDashboard';
import UiHelpers from '../helpers/UIHelpers.react';
import { Icon } from '@opuscapita/react-icons';

import './InvoiceLayout.less';

export default class InvoiceLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'image',
    };
  }

  setPage = (event, page) => {
    event.preventDefault();
    this.setState({
      activePage: page,
    });
  }

  getImage = (invoice) => (
    UiHelpers.getInvoiceImageControl(invoice.id,
          `/invoice/api/invoices/${invoice.id}/attachment`)
  )

  getDetails = (invoice) => (
    <div id="content">
      <InvoiceDataDashboard invoice={invoice} />
    </div>
  )

  render() {
    return this.props.invoice ? (
      <div id="single-invoice">
        <div id="content">
          <Link to={'/invoice/taskList'}>
            <Icon type="indicator" name="arrowLeft" />
          </Link>
          {this.state.activePage === "image" && this.getImage(this.props.invoice ) }
          {this.state.activePage === "details" && this.getDetails(this.props.invoice ) }
        </div>
        <div id="navigation">
          <ul>
            <li className={`topborder ${this.state.activePage === 'image' ? 'doing' : ''}`}>
              <a href="" onClick={(e) => this.setPage(e, 'image')}>Image</a>
            </li>
            <li className={`border ${this.state.activePage === 'details' ? 'doing' : ''}`}>
              <a href="" onClick={(e) => this.setPage(e, 'details')}>Details</a>
            </li>
          </ul>
        </div>
      </div>
    ) : null;
  }
}

InvoiceLayout.propTypes = {
  getInvoice: PropTypes.func.isRequired,
  invoice: PropTypes.object
};
