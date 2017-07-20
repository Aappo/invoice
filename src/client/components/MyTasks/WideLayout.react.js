import React, { PropTypes } from 'react';

import MyTasksList from './list/MyTasksList.react';
import Action from './actions/Action.react';
import Details from './details/Details.react';

import './WideLayout.less';

const WideLayout = ({list, invoice, getInvoice, updateInvoice}) => (
  <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
    <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-wide-list">
      <MyTasksList
        list={list}
        invoice={invoice}
        getInvoice={getInvoice}
      />
    </div>
    <div id="oc-invoices-my-tasks-invoice" className="oc-invoices-my-tasks-wide-invoice">
      <Action invoice={invoice} updateInvoice={updateInvoice}/>
      <Details invoice={invoice} />
    </div>
  </div>
);

WideLayout.propTypes = {
  list: PropTypes.array.isRequired,
  invoice: PropTypes.object.isRequired,
  getInvoice: PropTypes.func.isRequired,
  updateInvoice: PropTypes.func.isRequired
};

export default WideLayout;
