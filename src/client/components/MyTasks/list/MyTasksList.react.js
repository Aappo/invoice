import React, { PureComponent, PropTypes } from 'react';
import { withRouter, routerShape } from 'react-router';
import UiHelpers from '../helpers/UIHelpers.react';
import SortInvoice from '../sort-invoice/SortInvoice.react';
import List from '../select-list/List';
import TaskItem from './TaskItem.react';
import './MyTasksList.less';
import Promise from 'bluebird'
import _ from 'lodash';
import { VIEW_SORTING_RULES } from '../constants';
import InvoiceViews from '../../../../common/InvoiceViews';
import { Link } from 'react-router';

class MyTasksList extends PureComponent {

  static propTypes = {
    list: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    getInvoice: PropTypes.func.isRequired,
    narrowLayout: PropTypes.bool
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    router: routerShape.isRequired
  };

  constructor(props, context) {
    super(props);
    // TODO: Investigate what place would be more appropriate for such common and permanent value as view name.
    this.view = InvoiceViews.getByPath(context.router.location.pathname);
    this.sortingRules = VIEW_SORTING_RULES[this.view.name]; // View must be resolved in any case
    this.state = {
      selected: 0,
      sortedBy: null
    };
  }

  componentDidMount() {
    this.handleSortList('dueDate');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.list.length !== 0) {
      if (prevProps.list.length > this.props.list.length) {
        if (prevProps.list.length - this.state.selected === 1) {
          // Move previously last selection to the end of the current list
          this.setState({ selected: this.props.list.length - 1 },
            () => this.props.getInvoice(this.props.list[this.state.selected].id)
          );
        } else {
          // Leave others in the old position
          this.setState({ selected: this.state.selected },
            () => this.props.getInvoice(this.props.list[this.state.selected].id)
          );
        }
      } else if (prevState.sortedBy !== this.state.sortedBy) {
        // Move to the beginning if sorting rules has been changed
        this.setState({ selected: 0 }, () => this.props.getInvoice(this.props.list[0].id));
      }
    }
  }

  handleSortList(field) {
    const order = _.find(this.sortingRules, { field: field }).order;
    if (this.state.sortedBy !== field) {
      return this.props.onSort(UiHelpers.getInvoiceComparator(field, order)).then(sorted =>
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

          <div className="oc-task-link oc-task-link--active">
            <Link to={InvoiceViews.MY_TASKS.path}>
              {this.context.i18n.getMessage('Navigation.myInvoices.myTaskList')}
            </Link>
          </div>
          <div className="oc-task-link">
            <Link to={InvoiceViews.PROCESSED_TASKS.path}>
              {this.context.i18n.getMessage('Navigation.myInvoices.processed')}
            </Link>
          </div>
          <SortInvoice
            value={this.state.sortedBy}
            items={
              this.sortingRules.map(rule => {
                return { value: rule.field, label: this.context.i18n.getMessage(`MyTaskList.label.${rule.field}`) };
              })
            }
            onChange={({ value }) => this.handleSortList(value)}
          />
        </div>
        <div id="list-content" className="oc-invoices-my-tasks-list-content">
          <List
            items={this.props.list.map(invoice =>
              <TaskItem invoice={invoice} showDueDateBadge={InvoiceViews.PROCESSED_TASKS !== this.view} />
            )}
            selected={this.props.narrowLayout ? [] : [this.state.selected]}
            multiple={false}
            onChange={(selected) => {
              if (!this.props.narrowLayout) {
                this.props.getInvoice(this.props.list[selected].id);
                this.setState({ selected });
              } else {
                this.props.router.push(
                  `/invoice/tasks/${this.props.list[selected].id}`);
              }
            }}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(MyTasksList);
