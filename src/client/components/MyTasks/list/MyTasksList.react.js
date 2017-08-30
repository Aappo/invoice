import React, { PureComponent, PropTypes } from 'react';
import { withRouter, routerShape } from 'react-router';
import UiHelpers from '../helpers/UIHelpers.react';
import SortInvoice from '../sort-invoice/SortInvoice.react';
import List from '../select-list/List';
import TaskItem from './TaskItem.react';
import './MyTasksList.less';
import Promise from 'bluebird'


class MyTasksList extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    getInvoice: PropTypes.func.isRequired,
    narrowLayout: PropTypes.bool,
    router: routerShape.isRequired,
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  state = {
    selected: 0,
    sortedBy: null
  };

  componentDidMount() {
    this.handleSortList('dueDate');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.list.length !== 0 &&
      (prevProps.list.length !== this.props.list.length || prevState.sortedBy !== this.state.sortedBy)
    ) {
      this.setState({ selected: 0 }, () => this.props.getInvoice(this.props.list[0].id));
    }
  }

  handleSortList(field) {
    if (this.state.sortedBy !== field) {
      return this.props.onSort(UiHelpers.getInvoiceComparator(field)).then(sorted =>
        Promise.resolve(this.setState({ sortedBy: field }))
      )
    } else {
      return Promise.resolve();
    }
  }

  render() {
    return (
      <div id="list-container" className="oc-invoices-my-tasks-list">
        <div id="list-header" className="oc-invoices-my-tasks-list-header">
          <SortInvoice
            value={this.state.sortedBy}
            onChange={({ value }) => this.handleSortList(value)}
          />
        </div>
        <div id="list-content" className="oc-invoices-my-tasks-list-content">
          <List
            items={this.props.list.map(invoice => <TaskItem invoice={invoice} />)}
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
      </div>
    )
  }
}

export default withRouter(MyTasksList);
