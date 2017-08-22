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

  componentDidMount() {
    this.props.getInvoice(this.props.invoiceId);
  }

  setPage = (event, page) => {
    event.preventDefault();
    this.setState({
      activePage: page,
    });
  }

  getImage = () => (
    UiHelpers.getInvoiceImageControl(this.props.invoiceId,
          `/invoice/api/invoices/${this.props.invoiceId}/attachment`)
  )

  getDetails = () => (
    <div id="content">
      <InvoiceDataDashboard invoice={this.props.invoice} />
    </div>
  )

  render() {
    return (
      <div id="single-invoice">
        <div id="content">
          <Link to={'/invoice/taskList'}>
            <Icon type="indicator" name="arrowLeft" />
          </Link>
          {this.state.activePage === "image" && this.getImage() }
          {this.state.activePage === "details" && this.getDetails() }
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
    );
  }
}

InvoiceLayout.propTypes = {
  invoiceId: PropTypes.string,
  getInvoice: PropTypes.func.isRequired,
  invoice: PropTypes.object,
};
