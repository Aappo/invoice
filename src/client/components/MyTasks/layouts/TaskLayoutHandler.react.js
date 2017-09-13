import React, { PropTypes } from 'react';
import withDataHandler from '../DataHandler.react';
import InvoiceLayout from './InvoiceLayout.react';
import { withRouter } from 'react-router';
import myTasksMessages from '../i18n';

export default class TaskLayoutHandler extends React.Component {

  static propTypes = {
    fetcher: PropTypes.func.isRequired,
    filter: PropTypes.func,
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.context.i18n.register('MyTasks', myTasksMessages);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.i18n.locale !== this.context.i18n.locale) {
      nextContext.i18n.register('MyTasks', myTasksMessages);
    }
  }

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
