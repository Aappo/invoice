import React, { Component, PropTypes } from 'react';
import Promise from 'bluebird';
import _ from 'lodash';
import InvoiceViews from '../../../../common/InvoiceViews';

/**
 * Injects common invoice operations to wrapped component
 *
 * @param WrappedComponent - wrapped component
 * @param fetchers - set of functions for fetching data ('task', 'list', 'invoice')
 * @param filter - filter
 * @returns {DataHandler}
 */
export default function withDataHandler(WrappedComponent, { fetchers, filter = task => !!task }) {

  class DataHandler extends Component {

    static propTypes = {
      taskFetcher: PropTypes.func.isRequired,
      listFetcher: PropTypes.func.isRequired,
      invoiceFetcher: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired
    };

    static contextTypes = {
      router: PropTypes.object.isRequired
    };

    static defaultProps = {
      taskFetcher: fetchers['task'],
      listFetcher: fetchers['list'],
      invoiceFetcher: fetchers['invoice'],
      filter: filter
    };

    state = {
      taskList: undefined,
    };

    componentDidMount() {
      this.props.listFetcher().then((invoices) => {
        if (invoices.length > 0) {
          return this.props.invoiceFetcher(invoices[0].id).then((invoiceData) =>
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
          query: { prevPath: this.context.router.location.pathname }
        });
        return false;
      }
      return true;
    }

    getInvoice(id) {
      return this.props.invoiceFetcher(id).then((invoice) => {
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
          invoice: this.props.taskFetcher(id),
          invoiceData: this.props.invoiceFetcher(id)
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
