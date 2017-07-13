import React, { PropTypes, Component } from 'react';
import messages from '../../i18n/InvoiceItemEditor'
import InvoiceItemForm from './InvoiceItemForm.react';
import request from 'superagent-bluebird-promise';
import { fetchUnitsOfMeasure } from '../../common/fetchers';

export default class InvoiceItemEditor extends Component {

  static propTypes = {
    onItemCreate: PropTypes.func,
    readOnly: PropTypes.bool
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    showNotification: PropTypes.func.isRequired,
    hideNotification: PropTypes.func.isRequired
  };

  static defaultProps = {
    readOnly: false
  };

  constructor(props) {
    super(props);
    this.state = {
      unitsOfMeasure: []
    };
  }

  componentWillMount() {
    this.context.i18n.register('InvoiceItemEditor', messages);
    fetchUnitsOfMeasure().then((unitsOfMeasure) => this.setState({ unitsOfMeasure: unitsOfMeasure })
    ).catch((error) => { throw Error(error); })
  }

  // TODO: find another way to pass invoiceKey
  handleCreateInvoiceItem(invoiceKey, payload, reset) {
    return request.post(`/invoice/api/invoices/${invoiceKey}/items`).set(
      'Accept', 'application/json'
    ).send({ ...payload, productKey: payload.productId }
    ).then((response) => Promise.resolve(reset())
    ).then(() => this.context.showNotification('Labels.saved', 'success')
    ).catch((error) => {
      this.context.showNotification('Labels.notSaved', 'error', 10);
      throw Error(error);
    }).finally(() => this.context.hideNotification());
  }

  // TODO: get rid of router usage
  render() {
    return (
      <InvoiceItemForm
        unitsOfMeasure={this.state.unitsOfMeasure}
        onSave={this.handleCreateInvoiceItem.bind(this, this.context.router.params.id)}
        onBack={() => (this.context.router.push('/invoice/'))}
        readOnly={this.props.readOnly}
      />
    )
  }
}
