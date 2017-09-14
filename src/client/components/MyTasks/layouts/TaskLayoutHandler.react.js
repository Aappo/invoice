import React, { PropTypes } from 'react';
import withDataHandler from '../DataHandler.react';
import InvoiceLayout from './InvoiceLayout.react';
import { withRouter } from 'react-router';

export default class TaskLayoutHandler extends React.Component {

  static propTypes = {
    fetcher: PropTypes.func.isRequired,
    filter: PropTypes.func,
  };

  render() {
    return React.createElement(
      withRouter(withDataHandler(InvoiceLayout, {
        fetcher: this.props.fetcher,
        filter: this.props.filter
      })),
      { ...this.props },
      null
    );
  }
}
