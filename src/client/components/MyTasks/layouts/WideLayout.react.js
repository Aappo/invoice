import React, { PropTypes } from 'react';
import MyTasksList from '../list/MyTasksList.react';
import ActionTabs from '../actions/ActionsTabs.react';
import Details from '../details/Details.react';
import LoadingLayout from './LoadingLayout.react';
import SortInvoice from '../sort-invoice/SortInvoice.react';

import './WideLayout.less';


export default class WideLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'dueDate',
    };
  }

  static propTypes = {
    list: PropTypes.array,
    invoice: PropTypes.object,
    getInvoice: PropTypes.func.isRequired,
    updateInvoice: PropTypes.func.isRequired
  };

  onChangeSort = (item) => {
    this.setState({ sortBy: item.value });
  };

  render() {
    return this.props.list ? (
      <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-wide">
        <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-wide-list">
          <SortInvoice
            items={[
              { value: 'dueDate', label: 'Due date' },
              { value: 'supplierId', label: 'Supplier' },
              { value: 'grossAmount', label: 'Gross amount' }
            ]}
            value={this.state.sortBy}
            onChange={::this.onChangeSort}
          />
          <MyTasksList
            list={this.props.list}
            getInvoice={this.props.getInvoice}
            sortBy={this.state.sortBy}
          />
        </div>
        <div id="oc-invoices-my-tasks-invoice" className="oc-invoices-my-tasks-wide-invoice">
          <ActionTabs invoice={this.props.invoice} updateInvoice={this.props.updateInvoice}/>
          <Details invoice={this.props.invoice}/>
        </div>
      </div>
    ) : <LoadingLayout />
  }

};
