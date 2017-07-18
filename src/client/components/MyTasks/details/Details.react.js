import React, { PropTypes } from 'react';

import './Details.less';


class Details extends React.Component {
  static propTypes = {
    invoice: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 1,
    };
  }

  getInvoiceImageControl = (file) => {
    if (!file) {
      return null;
    }

    const newFile = file.replace('invoice',
      `invoice${this.props.invoice.InvId}`);

    let mime = '';
    const extensionMatch = /\.(.*)$/;
    if (extensionMatch.test(file)) {
      mime = extensionMatch.exec(file)[1];
    }

    if (mime === 'pdf') {
      return (
        <object
          type="application/pdf"
          width="100%"
          name="invoice_image"
          height="100%"
          data={file}
          aria-label="Invoice image"
        />
      );
    }
    return (
      <iframe
        title="Invoice image"
        width="100%"
        name="invoice_image"
        height="100%"
        src={newFile}
      />
    );
  }

  getContent = () => {
    switch (this.state.selectedTab) {
      case 1:
        return this.getInvoiceImageControl('/invoice/static/test_workarea/invoiceReceipt_TEST.pdf');
      case 2:
        return (
          Details
        );
      default:
        return null;
    }
  }

  selectTab = (tabIndex) => {
    this.setState({
      selectedTab: tabIndex,
    });
  }

  render() {
    return (
      <div id="details">
        <div id="header">
          <ul>
            <li key={1} className={this.state.selectedTab === 1 ? 'doing' : ''}>
              <a
                id={1}
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  this.selectTab(1);
                }}
              >
                Invoice image
              </a>
            </li>
            <li key={2} className={this.state.selectedTab === 2 ? 'doing' : ''}>
              <a
                id={2}
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  this.selectTab(2);
                }}
              >
                Invoice details
              </a>
            </li>
          </ul>
        </div>
        { this.getContent() }
      </div>
    );
  }
}

export default Details;
