import React, { PureComponent, PropTypes } from 'react';
import { withRouter, routerShape } from 'react-router';
import UiHelpers from '../helpers/UIHelpers.react';

import List from '../select-list/List';
import TaskItem from './TaskItem.react';
import './MyTasksList.less';


class MyTasksList extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    getInvoice: PropTypes.func.isRequired,
    sortBy: PropTypes.string,
    narrowLayout: PropTypes.bool,
    router: routerShape.isRequired,
  };

  static defaultProps = {
    sortBy: null
  };

  state = {
    selected: 0
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.list.length !== nextProps.list.length && nextProps.list.length !== 0) {
      this.setState({ selected: 0 }, () => this.props.getInvoice(nextProps.list[0].id));
    }
  }

  render() {
    let items = this.props.list;

    if (this.props.sortBy) {
      items = items.slice(0).sort(UiHelpers.getInvoiceComparator(this.props.sortBy));
    }

    items = items.map(invoice => (
      <TaskItem invoice={invoice} />
    ));

    return (
      <div id="list-content" className="oc-invoices-my-tasks-list">
        <List
          items={items}
          selected={this.props.narrowLayout ? [] : [this.state.selected]}
          multiple={false}
          onChange={(selected) => {
            if (!this.props.narrowLayout) {
              this.props.getInvoice(this.props.list[selected].id);
              this.setState({ selected });
            } else {
              this.props.router.push(
                `/invoice/task/${this.props.list[selected].id}`);
            }
          }}
        />
      </div>
    );
  }
}

export default withRouter(MyTasksList);
