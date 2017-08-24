import React, { PropTypes } from 'react';
import LoadingLayout from './LoadingLayout.react';
import MyTasksList from '../list/MyTasksList.react';
import SortInvoice from '../sort-invoice/SortInvoice.react';

import './NarrowLayout.less';

export default class NarrowLayout extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    invoice: PropTypes.object,
    getInvoice: PropTypes.func.isRequired,
    updateInvoice: PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'dueDate',
    };
  }

  onChangeSort = (item) => {
    this.setState({ sortBy: item.value });
  };

  render() {
    return this.props.list ? (
      <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-narrow">
        <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-narrow-list">
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
            sortBy={this.state.sortBy}
            getInvoice={this.props.getInvoice}
            narrowLayout={true}
          />
        </div>
      </div>
    ) : <LoadingLayout />
  }
};
