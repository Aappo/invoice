import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from '@opuscapita/react-icons';


import Actions from '../actions/Actions.react';
import InvoiceDataDashboard from '../../common/Details/InvoiceDataDashboard';
import UiHelpers from '../../util/UIHelpers.react';
import TaskItem from '../list/TaskItem.react';
import InvoicePosting from '../../common/Details/InvoicePosting/InvoicePosting.react';
import InvoiceViews from '../../../../common/InvoiceViews';

import './InvoiceLayout.less';

export default class InvoiceLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'approval',
    };
  }

  setPage = (event, page) => {
    event.preventDefault();
    this.setState({
      activePage: page,
    });
  }

  getApproval = (invoice) => (
    <div id="content">
      {invoice ?
        <div id="approval">
          <TaskItem
            invoice={this.props.invoice}
            showDueDateBadge={true}
          />
          <Actions
            invoice={this.props.invoice}
            updateInvoice={this.props.updateInvoice}
          />
        </div> : null}
    </div>
  )

  getImage = (invoice) => (
    UiHelpers.getInvoiceImageControl(invoice.id,
          `/invoice/api/invoices/${invoice.id}/attachment`)
  )

  getDetails = (invoice) => (
    <div id="content">
      <InvoiceDataDashboard invoice={invoice} />
    </div>
  )

  getPosting = (invoice) => (
    <div id="content">
      <InvoicePosting invoice={invoice}/>
    </div>
  )

  render() {
    return this.props.invoice ? (
      <div id="single-invoice">
        <div id="content-container">
          <div id="header">
            {this.state.activePage === 'approval' && <Link to={InvoiceViews.MY_TASKS.path}>
              <Icon type="indicator" name="arrowLeft" />
            </Link>}
            {this.state.activePage !== 'approval' &&
              <Icon
                type="indicator"
                name="arrowLeft"
                onClick={(e) => this.setPage(e, 'approval')}
              />
            }
          </div>
          <div id="content">
            {this.state.activePage === "approval" &&
              this.getApproval(this.props.invoice) }
            {this.state.activePage === "image" &&
              this.getImage(this.props.invoice) }
            {this.state.activePage === "details" &&
              this.getDetails(this.props.invoice) }
            {this.state.activePage === "posting" &&
              this.getPosting(this.props.invoice) }
          </div>
          <div id="navigation">
            <ul>
              <li className={
                `topborder ${this.state.activePage === 'image' ? 'doing' : ''}`}
              >
                <a href="" onClick={(e) => this.setPage(e, 'image')}>Image</a>
              </li>
              <li className={
                `border ${this.state.activePage === 'details' ? 'doing' : ''}`}
              >
                <a href="" onClick={(e) => this.setPage(e, 'details')}>Details</a>
              </li>
              <li className={
                `border ${this.state.activePage === 'posting' ? 'doing' : ''}`}
              >
                <a href="" onClick={(e) => this.setPage(e, 'posting')}>Posting</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ) : null;
  }
}

InvoiceLayout.propTypes = {
  getInvoice: PropTypes.func.isRequired,
  updateInvoice: PropTypes.func.isRequired,
  invoice: PropTypes.object
};
