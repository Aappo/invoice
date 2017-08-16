import React, { Component, PropTypes } from 'react';
import { APP_VIEWS } from '../constants';
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
      case APP_VIEWS.EMPTY_ASSIGNED_TASKS:
        return this.context.i18n.getMessage('EmptyLayout.message.assignedTasks');
      case APP_VIEWS.EMPTY_PROCESSED_TASKS:
        return this.context.i18n.getMessage('EmptyLayout.message.processedTasks');
      default:
        throw new Error('Requested view is not found.');
    }
  };

  render() {
    return (
      <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
        <div id="oc-invoices-my-tasks-empty" className="oc-invoices-my-tasks-wide-empty">
          <h4 className="center-block">
            {this.getMessageForView(this.props.location.query.view)}
          </h4>
        </div>
      </div>
    );
  }
};
