import React, {PropTypes} from 'react';
import InvoiceViews from '../../../../common/InvoiceViews';
import { Link } from 'react-router';

const DisplayModeSwitcher = ({}, {i18n, router}) => {
  const getActiveClass = (view) => {
    return InvoiceViews.getByPath(router.location.pathname).name === view.name?
      'oc-task-link oc-task-link--active' : 'oc-task-link'
  };

  return(
    <div>
      <div className={getActiveClass(InvoiceViews.MY_TASKS)}>
        <Link to={InvoiceViews.MY_TASKS.path}>
          {i18n.getMessage('Navigation.myInvoices.myTaskList')}
        </Link>
      </div>
      <div className={getActiveClass(InvoiceViews.PROCESSED_TASKS)}>
        <Link to={InvoiceViews.PROCESSED_TASKS.path}>
          {i18n.getMessage('Navigation.myInvoices.processed')}
        </Link>
      </div>
    </div>
  );
};

DisplayModeSwitcher.contextTypes = {
  i18n: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default DisplayModeSwitcher;

