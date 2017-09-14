import React, { PropTypes } from 'react';
import InvoiceAttachment from './InvoiceAttachment';
import InvoiceDataDashboard from './InvoiceDataDashboard';
import InvoicePosting from './InvoicePosting/InvoicePosting.react';
import './Details.less';


class Details extends React.Component {

  static propTypes = {
    invoice: PropTypes.object.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
    };
  }

  getContent = (invoice) => {
    switch (this.state.selectedTab) {
      case 1:
        return <InvoiceAttachment invoice={invoice}/>
      case 2:
        return (
          <div id="content">
            <InvoiceDataDashboard invoice={invoice}/>
          </div>
        );
      case 3:
        return <InvoicePosting invoice={invoice}/>
      default:
        return null;
    }
  };

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
              <a id={1} href="" onClick={(e) => {
                  e.preventDefault();
                  this.selectTab(1);
                }}
              >
                {this.context.i18n.getMessage('Details.header.image')}
              </a>
            </li>
            <li key={2} className={this.state.selectedTab === 2 ? 'doing' : ''}>
              <a id={2} href="" onClick={(e) => {
                  e.preventDefault();
                  this.selectTab(2);
                }}
              >
                {this.context.i18n.getMessage('Details.header.details')}
              </a>
            </li>
            <li key={3} className={this.state.selectedTab === 3 ? 'doing' : ''}>
              <a id={3} href="" onClick={(e) => {
                  e.preventDefault();
                  this.selectTab(3);
                }}
              >
                {this.context.i18n.getMessage('Details.header.posting')}
              </a>
            </li>
          </ul>
        </div>
          {this.getContent(this.props.invoice)}
      </div>
    );
  }
}

export default Details;
