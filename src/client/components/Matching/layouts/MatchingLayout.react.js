import React, { PropTypes } from 'react';
import Details from '../../common/Details';
import MatchingList from '../list/MatchingList.react';
import './MatchingLayout.less';

// imports from MyTasks
import LoadingLayout from '../../MyTasks/layouts/LoadingLayout.react';


const MatchingLayout = ({ list, onSort, invoice, getInvoice }) => {
  return list ? (
    <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
      <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-wide-list">
        <MatchingList
          list={list}
          onSort={onSort}
          getInvoice={getInvoice}
        />
      </div>
      <div id="oc-invoices-my-tasks-invoice" className="oc-invoices-my-tasks-wide-invoice">
        {invoice ? <Details invoice={invoice}/> : null}
      </div>
    </div>
  ) : <LoadingLayout />
};

MatchingLayout.propTypes = {
  list: PropTypes.array,
  onSort: PropTypes.func.isRequired,
  invoice: PropTypes.object,
  getInvoice: PropTypes.func.isRequired
};

export default MatchingLayout;
