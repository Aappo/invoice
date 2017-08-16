import React, {PropTypes} from 'react';
import { APP_VIEWS } from '../constants';

const EmptyLayout = ({ location: { query } }, { i18n }) => {
  const getMessageForView = (view) => {
    switch(view) {
      case APP_VIEWS.EMPTY_ASSIGNED_TASKS:
        return i18n.getMessage('EmptyLayout.message.assignedTasks');
      case APP_VIEWS.EMPTY_PROCESSED_TASKS:
        return i18n.getMessage('EmptyLayout.message.processedTasks');
      default:
        throw new Error('Requested view is not found.');
    }
  };

  return (
    <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
      <div id="oc-invoices-my-tasks-empty" className="oc-invoices-my-tasks-wide-empty">
        <h4 className="center-block">
          {getMessageForView(query.view)}
        </h4>
      </div>
    </div>
  );
};

EmptyLayout.propTypes = {
  location: PropTypes.object.isRequired // Injected by router
};

EmptyLayout.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default EmptyLayout;
