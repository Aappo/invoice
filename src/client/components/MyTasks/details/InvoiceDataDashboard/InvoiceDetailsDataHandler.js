import React, { PropTypes, Component } from 'react';
import './cards.less';

/**
 * Generic data handler for InvoiceDetails data cards
 *
 * @invoice - purchase invoice instance
 * @fetchData functions that takes invoice as an argument and returns promise
 * @renderView - function that takes ({invoice, fetchresult}) and returns jsx view
 *
 * @author Daniel Zhitomirsky
 */
const Spinner = () => (
  <div className="center-block">
    <i style={{ fontSize: '60px' }} className="fa fa-spinner fa-spin fa-5x fa-fw"/>
  </div>
);

export default class InvoiceDetailsDataHandler extends Component {
  static propTypes = {
    invoice: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    renderView: PropTypes.func.isRequired
  };

  state = {
    loading: true
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.invoice.id !== nextProps.invoice.id) {
      this.setState({
        loading: true
      }, () => this.loadData(nextProps.invoice));
    }
  }

  componentDidMount() {
    this.loadData(this.props.invoice);
  }

  loadData(invoice) {
    return this.props.fetchData(invoice).then((fetchResult) => {
      this.setState({
        loading: false,
        fetchResult: fetchResult
      })
    })
  }


  render() {
    if (this.state.loading) {
      return (<Spinner/>);
    } else {
      return this.props.renderView({
        invoice: this.props.invoice,
        fetchResult: this.state.fetchResult
      })
    }
  }
}
