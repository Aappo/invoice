import React, { PropTypes } from 'react';
import EmptyLayout from './EmptyLayout.react';
import MyTasksList from './list/MyTasksList.react';

import './NarrowLayout.less';

class NarrowLayout extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    getInvoice: PropTypes.func.isRequired,
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
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
    if (!this.props.list || this.props.list.length === 0) {
      return <EmptyLayout message={ this.context.i18n.getMessage('EmptyLayout.message.assignedTasks') } isLoading={!this.props.list} />
    }

    return (
      <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-narrow">
        <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-narrow-list">
          <MyTasksList
            list={this.props.list}
            sortBy={this.state.sortBy}
            getInvoice={this.props.getInvoice}
          />
        </div>
      </div>
    );
  }
}

export default NarrowLayout;
