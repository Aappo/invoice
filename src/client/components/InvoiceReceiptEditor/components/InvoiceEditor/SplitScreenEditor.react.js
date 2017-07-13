import React, { PropTypes, Component } from 'react';
import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';
import InvoiceForm from './InvoiceForm.react';
import InvoiceItemsPricePanel from './InvoiceItemsPricePanel.react';
import InvoiceItemsGrid from './InvoiceItemsGrid.react';
import InvoiceItemDeleteModal from './InvoiceItemDeleteModal.react';
import ReactPDF from 'react-pdf';
import { fetchInvoiceReceiptItems } from '../../common/fetchers';

export default class SplitScreenEditor extends Component {

  static propTypes = {
    invoiceId: PropTypes.number,
    onCancel: PropTypes.func,
    readOnly: PropTypes.bool,

    /* Props injected from higher order component (marked as not required) */
    updateInvoice: PropTypes.func,
    calculateItemsPrice: PropTypes.func,
    invoice: PropTypes.object,
    itemsPriceInfo: PropTypes.object,
    customer: PropTypes.object,
    supplier: PropTypes.object,
    supplierAddresses: PropTypes.array,
    supplierContacts: PropTypes.array,
    termsOfDelivery: PropTypes.array,
    termsOfPayment: PropTypes.array,
    methodsOfPayment: PropTypes.array,
    currencies: PropTypes.array,
    statusLabel: PropTypes.func,
    displayMode: PropTypes.oneOf(['one-column', 'two-column'])
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    showNotification: PropTypes.func.isRequired
  };

  static defaultProps = {
    readOnly: false
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      deleteModal: { isShown: false }
    }
  }

  componentDidMount() {
    if (this.props.invoiceId) {
      this._loadInvoiceItems(this.props.invoiceId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.invoiceId !== this.props.invoiceId) {
      if (nextProps.invoiceId) {
        this._loadInvoiceItems(nextProps.invoiceId);
      } else {
        this.setState({ items: [] });
      }
    }
  }

  _loadInvoiceItems(invoiceId) {
    return fetchInvoiceReceiptItems(invoiceId).then((items) => {
      this.setState({ items: items });
    });
  }

  deleteInvoiceItem(id) {
    return Promise.resolve(this.hideDeleteModal()).then(() =>
      request.delete(`/invoice/api/invoices/${this.props.invoiceId}/items/${id}`).set('Accept', 'application/json'
      ).catch((error) => {
        this.context.showNotification('Labels.itemNotDeleted', 'error', 10);
        throw Error(error);
      })
    ).then(() => {
      this.context.showNotification('Labels.invoiceItemDeleted', 'success');
      return Promise.resolve(this._loadInvoiceItems(this.props.invoiceId)
      ).then(() => Promise.resolve(this.props.calculateItemsPrice())
      ).catch((error) => {
        this.context.showNotification('Messages.loadingDataError', 'error', 10, false);
        throw Error(error);
      })
    })
  }

  showDeleteModal(invoiceItemId) {
    this.setState({ deleteModal: { isShown: true, invoiceItemId: invoiceItemId } });
  }

  hideDeleteModal() {
    this.setState({ deleteModal: { isShown: false } });
  }

  render() {
    const { readOnly } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <ReactPDF
              file="/invoice/static/test_workarea/invoiceReceipt_TEST.pdf"
            />
          </div>
          <div className="col-md-6">
            <div className="edit-invoice">
              <InvoiceForm
                readOnly={readOnly}
                invoice={this.props.invoice}
                customer={this.props.customer}
                supplier={this.props.supplier}
                supplierAddresses={this.props.supplierAddresses}
                supplierContacts={this.props.supplierContacts}

                termsOfDelivery={this.props.termsOfDelivery}
                termsOfPayment={this.props.termsOfPayment}
                methodsOfPayment={this.props.methodsOfPayment}
                currencies={this.props.currencies}

                statusLabel={this.props.statusLabel}
                onCancel={this.props.onCancel}
                onSave={this.props.updateInvoice}
                displayMode={'one-column'}
              />
              <br/>
              <InvoiceItemsPricePanel
                readOnly={readOnly}
                priceInfo={this.props.itemsPriceInfo}
                onAddPositions={() => (this.context.router.push(`/invoice/edit/${this.props.invoiceId}/items`))}
              />
            </div>
          </div>
        </div>
        <InvoiceItemsGrid
          readOnly={readOnly}
          items={this.state.items}
          onDelete={::this.showDeleteModal}
        />
        <InvoiceItemDeleteModal
          {...this.state.deleteModal}
          onDelete={::this.deleteInvoiceItem}
          onCancel={::this.hideDeleteModal}
        />
      </div>
    )
  }
}
