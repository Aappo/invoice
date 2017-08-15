import React from 'react';

const LoadingLayout = () => (
  <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
    <div id="oc-invoices-my-tasks-empty" className="oc-invoices-my-tasks-wide-empty">
      <i style={{fontSize: '60px'}} className="center-block fa fa-spinner fa-spin fa-5x fa-fw"/>
    </div>
  </div>
);

export default LoadingLayout;
