import React, { PropTypes } from 'react';

import MyTasksList from './list/MyTasksList.react';
import Action from './actions/Action.react';
import Details from './details/Details.react';

import './WideLayout.less';


class WideLayout extends React.Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    invoice: PropTypes.object.isRequired,
    getInvoice: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
        <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-wide-list">
          <MyTasksList
            list={this.props.list}
            invoice={this.props.invoice}
            getInvoice={this.props.getInvoice}
          />
        </div>
        <div id="oc-invoices-my-tasks-invoice" className="oc-invoices-my-tasks-wide-invoice">
          <Action invoice={this.props.invoice} />
          <Details invoice={this.props.invoice} />
        </div>
      </div>
    );
  }
}

export default WideLayout;
