import React, { PropTypes } from 'react';

import MyTasksList from './list/MyTasksList.react';
import EmptyLayout from './EmptyLayout.react';

import './NarrowLayout.less';

const NarrowLayout = ({ list, invoice, getInvoice, updateInvoice }) => {
  if (!list || list.length === 0) {
    return (<EmptyLayout isLoading={!list}/>);
  }

  return (
    <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-narrow">
      <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-narrow-list">
        <MyTasksList
          list={list}
          sortBy={null}
          getInvoice={getInvoice}
          narrowLayout={true}
        />
      </div>
    </div>
  );
}

NarrowLayout.propTypes = {
  list: PropTypes.array,
  invoice: PropTypes.object,
  getInvoice: PropTypes.func.isRequired,
  updateInvoice: PropTypes.func.isRequired
};

export default NarrowLayout;
