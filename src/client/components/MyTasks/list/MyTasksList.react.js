import React, { PureComponent, PropTypes } from 'react';
import List from '../select-list/List';
import TaskItem from './TaskItem.react';
import './MyTasksList.less';


export default class MyTasksList extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    getInvoice: PropTypes.func.isRequired,
    sortBy: PropTypes.string
  };

  static defaultProps = {
    sortBy: null
  };

  state = {
    selected: 0
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.list.length !== nextProps.list.length &&
        !nextProps.list.length === 0) {
      this.props.getInvoice(nextProps.list[0]['key']);
    }
  }

  render() {
    let items = this.props.list;

    if (this.props.sortBy) {
      items = items.sort(
        (first, second) =>
          first.get(this.props.sortBy).localeCompare(
            second.get(this.props.sortBy)),
      );
    }

    items = items.map(invoice => (
      <TaskItem invoice={invoice} />
    ));

    return (
      <div id="list-content" className="oc-invoices-my-tasks-list">
        <List
          items={items}
          selected={[this.state.selected]}
          multiple={false}
          onChange={(selected) => {
            this.props.getInvoice(this.props.list[selected]['key']);
            this.setState({selected});
          }}
        />
      </div>
    );
  }
}

