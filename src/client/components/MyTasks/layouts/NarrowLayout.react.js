import React, { PropTypes } from 'react';
import LoadingLayout from './LoadingLayout.react';
import MyTasksList from '../list/MyTasksList.react';

import './NarrowLayout.less';

class NarrowLayout extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    getInvoice: PropTypes.func.isRequired,
    updateInvoice: PropTypes.func.isRequired
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
    return this.props.list ? (
      <div id="oc-invoices-my-tasks" className="oc-invoices-my-tasks-narrow">
        <div id="oc-invoices-my-tasks-list" className="oc-invoices-my-tasks-narrow-list">
          <MyTasksList
            list={this.props.list}
            sortBy={null}
            getInvoice={this.props.getInvoice}
            narrowLayout={true}
          />
        </div>
      </div>
    ) : <LoadingLayout />
  }
}

export default NarrowLayout;
