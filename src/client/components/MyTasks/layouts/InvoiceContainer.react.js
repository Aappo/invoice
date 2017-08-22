import React, { PropTypes } from 'react';
import withDataHandler from '../DataHandler.react';
import InvoiceLayout from './InvoiceLayout.react';


export default class InvoiceContainer extends React.Component {

  static propTypes = {
    options: PropTypes.object
  };

  static defaultProps = {
    options: {},
  };

  render() {
    return React.createElement(
      withDataHandler(InvoiceLayout, this.props.options),
      { ref: 'invoiceLayout' },
      null
    );
  }
}
