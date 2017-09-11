import React, { Component, PropTypes } from 'react';
import Promise from 'bluebird';
import _ from 'lodash';
import InvoiceViews from '../../../../common/InvoiceViews';

/**
 * Generic configurable HOC data handler providing common invoice operation.
 *
 * @param WrappedComponent - wrapped component
 * @param config - data handler configuration:
 *  invoiceFetcher - fetcher function to load single invoice
 *  listFetcher - fetcher function to load list of invoices
 *  withDetails - wrapper function to add additional details to invoice if needed (optional)
 *  filter - filter function specifying should invoice be removed from the list after update (optional)
 *  sorting - sorting configuration of form { <field name>:<comparator> } (optional)
 * @returns {DataHandler}
 */
export default function withDataHandler(WrappedComponent, config) {

  const defaultConfig = {
    withDetails: invoice => Promise.resolve(invoice),
    filter: invoice => !!invoice,
    sorting: {}
  };

  const {
    invoiceFetcher,
    listFetcher,
    withDetails,
    filter,
    sorting
  } = Object.assign({}, defaultConfig, config);

  class DataHandler extends Component {

    static propTypes = {
      invoiceFetcher: PropTypes.func.isRequired,
      listFetcher: PropTypes.func.isRequired,
      withDetails: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      sorting: PropTypes.object.isRequired
    };

    static contextTypes = {
      router: PropTypes.object.isRequired
    };

    static defaultProps = {
      invoiceFetcher: invoiceFetcher,
      listFetcher: listFetcher,
      withDetails: withDetails,
      filter: filter,
      sorting: sorting
    };

    state = {
      list: undefined,
      invoiceData: undefined
    };

    componentDidMount() {
      this.props.listFetcher().then((list) => {
        if (list.length > 0) {
          return Promise.resolve(this.setState({ list }, () => this.getInvoice(list[0].id)))
        } else {
          return Promise.resolve(this.setState({ list }));
        }
      })
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.list && nextState.list.length === 0) {
        this.context.router.push({
          pathname: InvoiceViews.EMPTY_VIEW.path,
          query: { prevPath: this.context.router.location.pathname }
        });
        return false;
      }
      return true;
    }

    loadInvoiceData(id) {
      const invoice = _.find(this.state.list, { id: id });
      if (invoice) {
        return this.props.withDetails(_.cloneDeep(invoice)); // Should not allow to mutate list item externally
      } else {
        throw new Error('Attempting to load data for invoice which is not present in the list');
      }
    }

    getInvoice(id) {
      return this.loadInvoiceData(id).then((invoiceData) => {
        return Promise.resolve(this.setState({ invoiceData }))
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
          _.find(this.state.list, { id: id })
        )
      ).then(() => {
        return Promise.props({
          invoice: this.props.invoiceFetcher(id),
          invoiceData: this.loadInvoiceData(id)
        }).then(({ invoice, invoiceData }) => {
          let updatedInvoice;
          let updatedList;
          if (this.props.filter(invoiceData)) {
            updatedInvoice = invoiceData;
            updatedList = _.map(this.state.list, item => item.id === id ? invoice : item);
          } else {
            updatedList = _.filter(this.state.list, item => item.id !== invoice.id);
          }
          return Promise.resolve(
            this.setState({
              invoiceData: updatedInvoice,
              list: updatedList
            })
          );
        })
      }).catch((err) => {
        console.error(err);
        throw Error(err);
      })
    }

    /**
     * Sorts list with by specified field. Returns promise notifying if the list has been sorted.
     *
     * @param field
     */
    sortList(field) {
      return this.state.list ? new Promise(resolve => {
        this.setState({ list: this.state.list.slice(0).sort(sorting[field]) }, () => resolve(true))
      }) : Promise.resolve(false)
    }

    render() {
      return (
        <WrappedComponent
          list={this.state.list}
          onSort={::this.sortList}
          invoice={this.state.invoiceData}
          getInvoice={::this.getInvoice}
          updateInvoice={::this.updateInvoice}
        />
      );
    }
  }

  return DataHandler;
}
