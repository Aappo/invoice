import React, { PureComponent, PropTypes } from 'react';
import Promise from 'bluebird'
import { Button } from 'react-bootstrap';
import SortInvoice from '../../common/Sorting/index';
import List from '../../common/SelectList/index';
import MatchingItem from './MatchingItem.react';
import './MatchingList.less';


export default class MatchingList extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    getInvoice: PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      sortedBy: null
    };
  }

  componentDidMount() {
    this.handleSortList('dueDate');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.list.length !== 0 && prevState.sortedBy !== this.state.sortedBy) {
      this.setState({ selected: 0 }, () => this.props.getInvoice(this.props.list[0].id));
    }
  }

  handleSortList(field) {
    if (this.state.sortedBy !== field) {
      return this.props.onSort(field).then(sorted => Promise.resolve(this.setState({ sortedBy: field })));
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
            items={[
              { value: 'dueDate', label: this.context.i18n.getMessage(`MyTaskList.label.dueDate`) },
              { value: 'supplier.supplierName', label: this.context.i18n.getMessage(`MyTaskList.label.supplier.supplierName`) },
              { value: 'grossAmount', label: this.context.i18n.getMessage(`MyTaskList.label.grossAmount`) }
            ]}
            onChange={({ value }) => this.handleSortList(value)}
          />
          <Button bsStyle="primary">
            {this.context.i18n.getMessage(`MyTaskList.label.matching`)}
          </Button>
        </div>
        <div id="list-content" className="oc-invoices-my-tasks-list-content">
          <List
            items={this.props.list.map(invoice => <MatchingItem invoice={invoice} />)}
            selected={[this.state.selected]}
            multiple={false}
            onChange={(selected) => {
              this.setState({ selected }, () => this.props.getInvoice(this.props.list[selected].id));
            }}
          />
        </div>
      </div>
    )
  }
}
