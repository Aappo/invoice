import React, { Component, PropTypes } from 'react';
import InvoiceViews from '../../../../common/InvoiceViews';
import messages from '../i18n';

// TODO: It better be pure functional component. Find another way to reload message bundles.
export default class EmptyLayout extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired // Injected by router
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.context.i18n.register('MyTasks', messages);
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(nextContext.i18n.locale !== this.context.i18n.locale){
      nextContext.i18n.register('MyTasks', messages);
    }
  }

  getMessageForView(view) {
    switch(view) {
      case InvoiceViews.ALL_TASKS:
        return this.context.i18n.getMessage('EmptyLayout.message.assignedTasks');
      case InvoiceViews.MY_TASKS:
        return this.context.i18n.getMessage('EmptyLayout.message.assignedTasks');
      case InvoiceViews.PROCESSED_TASKS:
        return this.context.i18n.getMessage('EmptyLayout.message.processedTasks');
      default:
        throw new Error('Could not find a view the request originated from');
    }
  };

  render() {
    return (
      <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
        <div id="oc-invoices-my-tasks-empty" className="oc-invoices-my-tasks-wide-empty">
          <h4 className="center-block">
            {this.getMessageForView(InvoiceViews.getByPath(this.props.location.query.prevPath))}
          </h4>
        </div>
      </div>
    );
  }
};
