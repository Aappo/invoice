import React, { Component, PropTypes } from 'react';
import Promise from 'bluebird';
import {
  fetchTaskActions,
  fetchInvoiceReceipt,
  fetchCustomer,
  fetchSupplier
} from './data/fetchers';
import _ from 'lodash';
import InvoiceViews from '../../../common/InvoiceViews';

const withTenants = task => {
  return Promise.props({
    customer: fetchCustomer(task.customerId),
    supplier: fetchSupplier(task.supplierId)
  }).then(tenants => Object.assign(task, tenants));
};

/**
 * Injects common invoice operations to wrapped component
 *
 * @param WrappedComponent - wrapped component
 * @param fetcher - list of tasks fetcher
 * @param filter - predicate defining if invoice should be displayed
 * @returns {DataHandler}
 */
export default function withDataHandler(WrappedComponent, { fetcher, filter = invoice => !!invoice }) {
  class DataHandler extends Component {

    static propTypes = {
      fetcher: PropTypes.func.isRequired,
      filter: PropTypes.func,
      location: PropTypes.object.isRequired // Injected by router
    };

    static contextTypes = {
      router: PropTypes.object.isRequired
    };

    static defaultProps = {
      fetcher: fetcher,
      filter: filter
    };

    state = {
      taskList: undefined,
    };

    componentDidMount() {
      this.props.fetcher().then((invoices) => Promise.all(invoices.map(withTenants))).then((invoices) => {
        if (invoices.length > 0) {
          return this.loadInvoiceData(invoices[0].id).then((invoiceData) =>
            Promise.resolve(this.setState({ taskList: invoices, invoice: invoiceData }))
          )
        } else {
          return Promise.resolve(this.setState({ taskList: invoices }));
        }
      })
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.taskList && nextState.taskList.length === 0) {
        this.context.router.push({
          pathname: InvoiceViews.EMPTY_VIEW.path,
          query: { prevPath: this.props.location.pathname }
        });
        return false;
      }
      return true;
    }

    loadInvoiceData(id) {
      return fetchInvoiceReceipt(id).then((invoice) => {
        return Promise.props({
          ...invoice,
          transitions: fetchTaskActions(invoice.id)
        })
      }).then(withTenants)
    }

    getInvoice(id) {
      return this.loadInvoiceData(id).then((invoice) => {
        return Promise.resolve(this.setState({ invoice }))
      }).catch((err) => {
        throw Error(err);
      });
    }

    /**
     * id - is the invoice (or task key to update and the updater -
     * is the function to call for invoice, invoice with 'id' will be
     * passed to it as an argument)
     * @param id
     * @param updater
     */
    updateInvoice(id, updater) {
      return Promise.resolve(
        updater(
          _.find(this.state.taskList, { id: id })
        )
      ).then(() => {
        return Promise.props({
          invoice: fetchInvoiceReceipt(id).then(withTenants),
          invoiceData: this.loadInvoiceData(id)
        }).then(({ invoice, invoiceData }) => {
          let updatedInvoice;
          let updatedTaskList;
          if (this.props.filter(invoiceData)) {
            updatedInvoice = invoiceData;
            updatedTaskList = _.map(this.state.taskList, task => task.id === id ? invoice : task);
          } else {
            updatedTaskList = _.filter(this.state.taskList, task => task.id !== invoiceData.id);
          }
          return Promise.resolve(
            this.setState({
              invoice: updatedInvoice,
              taskList: updatedTaskList
            })
          );
        })
      }).catch((err) => {
        console.error(err);
        throw Error(err);
      })
    }

    /**
     * Sorts task list with comparator function. Returns promise notifying if the list has been sorted.
     *
     * @param comparator
     */
    sortTaskList(comparator) {
      return this.state.taskList ? new Promise(resolve => {
        this.setState({ taskList: this.state.taskList.slice(0).sort(comparator) }, () => resolve(true))
      }) : Promise.resolve(false)
    }

    render() {
      return (
        <WrappedComponent
          list={this.state.taskList}
          onSort={::this.sortTaskList}
          invoice={this.state.invoice}
          getInvoice={::this.getInvoice}
          updateInvoice={::this.updateInvoice}
        />
      );
    }
  }

  return DataHandler;
}
