import React, { PropTypes } from 'react';
import LoadingLayout from './LoadingLayout.react';
import MyTasksList from '../list/MyTasksList.react';

import './NarrowLayout.less';

const NarrowLayout = ({ list, sortList, getInvoice }) => {
  return list ? (
    <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-narrow">
      <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-narrow-list">
        <MyTasksList
          list={list}
          sortList={sortList}
          getInvoice={getInvoice}
          narrowLayout={true}
        />
      </div>
    </div>
  ) : <LoadingLayout />
};

NarrowLayout.propTypes = {
  list: PropTypes.array,
  sortList: PropTypes.func.isRequired,
  getInvoice: PropTypes.func.isRequired
};

export default NarrowLayout;
