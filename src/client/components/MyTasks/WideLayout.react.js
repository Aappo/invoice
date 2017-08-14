import React, { PropTypes } from 'react';
import MyTasksList from './list/MyTasksList.react';
import ActionTabs from './actions/ActionsTabs.react';
import Details from './details/Details.react';
import EmptyLayout from './EmptyLayout.react';

import './WideLayout.less';

const WideLayout = ({ list, invoice, getInvoice, updateInvoice }, { i18n }) => {
  if (!list || list.length === 0) {
    return <EmptyLayout message={ i18n.getMessage('EmptyLayout.message.assignedTasks') } isLoading={!list} />
  }

  return (
    <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
      <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-wide-list">
        <MyTasksList
          list={list}
          getInvoice={getInvoice}
        />
      </div>
      <div id="oc-invoices-my-tasks-invoice" className="oc-invoices-my-tasks-wide-invoice">
        <ActionTabs invoice={invoice} updateInvoice={updateInvoice}/>
        <Details invoice={invoice}/>
      </div>
    </div>
  )
};

WideLayout.propTypes = {
  list: PropTypes.array,
  invoice: PropTypes.object,
  getInvoice: PropTypes.func.isRequired,
  updateInvoice: PropTypes.func.isRequired
};

WideLayout.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default WideLayout;
