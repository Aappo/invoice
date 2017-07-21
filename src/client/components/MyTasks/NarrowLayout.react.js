import React, { PropTypes } from 'react';

import MyTasksList from './list/MyTasksList.react';

import './NarrowLayout.less';

class NarrowLayout extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    invoice: PropTypes.object.isRequired,
    getInvoice: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sortBy: null,
    };
  }

  onChangeSort = (item) => {
    this.setState({ sortBy: item.value });
  }

  render() {
    return (
      <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-narrow">
        <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-narrow-list">
          <MyTasksList
            list={this.props.list}
            invoice={this.props.invoice}
            sortBy={this.state.sortBy}
            getInvoice={this.props.getInvoice}
          />
        </div>
      </div>
    );
  }
}

export default NarrowLayout;
