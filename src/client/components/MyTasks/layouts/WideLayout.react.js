import React, { PropTypes } from 'react';
import MyTasksList from '../list/MyTasksList.react';
import Actions from '../actions/Actions.react';
import Details from '../../common/Details/index';
import LoadingLayout from './LoadingLayout.react';

import './WideLayout.less';

const WideLayout = ({ list, onSort, invoice, getInvoice, updateInvoice }) => {
  return list ? (
    <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
      <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-wide-list">
        <MyTasksList
          list={list}
          onSort={onSort}
          getInvoice={getInvoice}
        />
      </div>
      <div id="oc-invoices-my-tasks-invoice" className="oc-invoices-my-tasks-wide-invoice">
        {invoice ? <Actions invoice={invoice} updateInvoice={updateInvoice}/> : null}
        {invoice ? <Details invoice={invoice}/> : null}
      </div>
    </div>
  ) : <LoadingLayout />
};

WideLayout.propTypes = {
  list: PropTypes.array,
  onSort: PropTypes.func.isRequired,
  invoice: PropTypes.object,
  getInvoice: PropTypes.func.isRequired,
  updateInvoice: PropTypes.func.isRequired
};

export default WideLayout;
