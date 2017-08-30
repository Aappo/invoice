import React, { PropTypes } from 'react';
import MyTasksList from '../list/MyTasksList.react';
import Actions from '../actions/Actions.react';
import Details from '../details/Details.react';
import LoadingLayout from './LoadingLayout.react';

import './WideLayout.less';

const WideLayout = ({ list, invoice, getInvoice, updateInvoice }) => {

  return list ? (
    <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
      <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-wide-list">
        <MyTasksList
          list={list}
          getInvoice={getInvoice}
        />
      </div>
      {invoice ? <div id="oc-invoices-my-tasks-invoice" className="oc-invoices-my-tasks-wide-invoice">
        <Actions invoice={invoice} updateInvoice={updateInvoice}/>
        <Details invoice={invoice}/>
      </div> : null}
    </div>
  ) : <LoadingLayout />
};

WideLayout.propTypes = {
  list: PropTypes.array,
  invoice: PropTypes.object,
  getInvoice: PropTypes.func.isRequired,
  updateInvoice: PropTypes.func.isRequired
};

export default WideLayout;
