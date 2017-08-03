import React, {PropTypes} from 'react';

const EmptyLayout = (props, {i18n}) => (
  <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
    <div id="oc-invoices-my-tasks-empty" className="oc-invoices-my-tasks-wide-empty">
      <h4 className="center-block">{i18n.getMessage('EmptyLayout.message')}</h4>
    </div>
  </div>
);

EmptyLayout.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default EmptyLayout;
