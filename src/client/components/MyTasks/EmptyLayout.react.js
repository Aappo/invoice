import React, {PropTypes} from 'react';

const EmptyLayout = ({message, isLoading}) => (
  <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
    <div id="oc-invoices-my-tasks-empty" className="oc-invoices-my-tasks-wide-empty">
        {isLoading?
          (<i style={{fontSize: '60px'}} className="center-block fa fa-spinner fa-spin fa-5x fa-fw"></i>) :
          (<h4 className="center-block">{message}</h4>)
        }
    </div>
  </div>
);

EmptyLayout.propTypes = {
  message: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

EmptyLayout.defaultProps = {
  isLoading: false
};

export default EmptyLayout;
