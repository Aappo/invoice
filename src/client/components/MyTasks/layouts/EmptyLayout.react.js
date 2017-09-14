import React, { PropTypes } from 'react';
import InvoiceViews from '../../../../common/InvoiceViews';

const EmptyLayout = (props, { i18n, router }) => {

  const getMessageForView = (view) => {
    switch(view) {
      case InvoiceViews.ALL_TASKS:
        return i18n.getMessage('EmptyLayout.message.assignedTasks');
      case InvoiceViews.MY_TASKS:
        return i18n.getMessage('EmptyLayout.message.assignedTasks');
      case InvoiceViews.PROCESSED_TASKS:
        return i18n.getMessage('EmptyLayout.message.processedTasks');
      case InvoiceViews.MATCHING:
        return i18n.getMessage('EmptyLayout.message.matchingTasks');
      default:
        throw new Error('Could not find a view the request originated from');
    }
  };

  return (
    <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
      <div id="oc-invoices-my-tasks-empty" className="oc-invoices-my-tasks-wide-empty">
        <h4 className="center-block">
          {getMessageForView(InvoiceViews.getByPath(router.location.query.prevPath))}
        </h4>
      </div>
    </div>
  );
};

EmptyLayout.contextTypes = {
  i18n: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default EmptyLayout;
