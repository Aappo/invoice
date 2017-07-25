import './InvoiceOverview.less';
import React, { Component, PropTypes } from 'react';
import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';
import InvoiceOverviewMarkup from './InvoiceOverviewMarkup.react';
import lodash from 'lodash';
import contentRange from 'content-range';
import messages from '../../i18n/InvoiceOverview';
import { COUNT } from '../../../../constants/pagination';
import { fetchInvoiceStatuses } from '../../common/fetchers';

export default class InvoiceOverview extends Component {

  static propTypes = {
    readOnly: PropTypes.bool
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    showNotification: PropTypes.func.isRequired
  };

  static defaultProps = {
    readOnly: false
  };

  state = {
    invoices: [],
    pagination: { first: 0, last: 0, length: 0 },
    checkedInvoices: [],
    deleteModal: { isShown: false },
    isMasterDataReady: false,
    exportLink: this._calculateExportLink([], []),
    editInvoiceId: null
  };

  componentWillMount() {
    this.context.i18n.register('InvoiceOverview', messages);
  }

  componentDidMount() {
    this._loadMasterData(::this.handleSearchInvoices);
  }

  _calculateExportLink(invoices, checked) {
    let url = '/invoice/api/invoices/export?';
    let idsToExport = lodash.size(checked) === 0 ?
      lodash.map(invoices, 'id') : checked;

    lodash.each(idsToExport, (id) => {
      url = url.concat(`exportIds=${id}&`)
    });
    return url;
  }

  statusLabel(statusId) {
    let status = lodash.find(this.state.statuses, { statusId: statusId });
    return status ? status.description : statusId;
  }

  isEditable(statusId) {
    return !this.props.readOnly && !lodash.includes(['approved', 'transferred'],
      (this.state.statuses.find((status) => status.statusId === statusId) || {}).description);
  }

  _loadMasterData(masterDataReadyCallback) {
    fetchInvoiceStatuses().then((statuses) =>
      Promise.resolve(this.setState({ statuses: statuses, isMasterDataReady: true }, masterDataReadyCallback))
    );
  }

  handleSearchInvoices(searchParams = {}, offset = 0, count = COUNT) {
    return Promise.resolve(
      this.context.showNotification('Messages.loadingData')
    ).then(() =>
      Promise.props({
          invoicesResponse: request.get('/invoice/api/approval/tasks').query(
            searchParams
          ).query({
            offset: offset,
            count: count
          }).set('Accept', 'application/json'),
        transitionsResponse: request.get('/invoice/api/approval/events').query(
            searchParams
          ).query({
            offset: offset,
            count: count
          })
        }
      )
    ).then((response) => {
      this.setState({
        invoices: response.invoicesResponse.body,
        transitions: response.transitionsResponse.body,
        pagination: contentRange.parse(response.invoicesResponse.header['content-range']),
        exportLink: this._calculateExportLink(response.invoicesResponse.body, []),
        editInvoiceId: null
      });
    }).catch((error) => {
      this.context.showNotification('Messages.loadingDataError', 'error', 10, false);
      throw Error(error);
    });
  }

  handleEventSend(id, event) {
    request.post(
      `/invoice/api/approval/events/${id}/${event}`
    ).set(
      'Accept', 'application/json'
    ).then((res) => this.handleSearchInvoices());
  }

  handleDeleteInvoice(id, searchParams = {}) {
    Promise.resolve(
      this.setState({ deleteModal: { isShown: false } })
    ).then(() => (
        request.delete(`/invoice/api/invoices/${id}`).set(
          'Accept', 'application/json')
      )
    ).then(() => Promise.resolve(this.context.showNotification('Labels.invoiceDeleted', 'success'))
    ).then(() => {
      const shift = (this.state.pagination.last / this.state.pagination.first) === 1 ? 1 : 0;
      return Promise.resolve(
        this.handleSearchInvoices(searchParams, COUNT * (Math.floor(this.state.pagination.first / COUNT) - shift))
      ).then(() => {
        if (this.state.editInvoiceId === id) {
          this.handleEditInvoice();
        }
      });
    }).catch((error) => {
      this.context.showNotification('Labels.notDeleted', 'error', 10);
      throw Error(error);
    });
  }

  handleEditInvoice(id) {
    this.setState({ editInvoiceId: id });
  }

  handleCancel() {
    this.setState({ editInvoiceId: null });
  }

  showDeleteModal(invoiceId) {
    this.setState({ deleteModal: { isShown: true, invoiceId: invoiceId } });
  }

  hideDeleteModal() {
    this.setState({ deleteModal: { isShown: false } });
  }

  markForExport(invoiceIds) {
    let checkedItemsIds = lodash.uniq(this.state.checkedInvoices.concat(invoiceIds));
    this.setState({
      checkedInvoices: checkedItemsIds,
      exportLink: this._calculateExportLink(this.state.invoices, checkedItemsIds)
    });
  }

  unMarkForExport(invoiceIds) {
    let checkedIds = lodash.reject(this.state.checkedInvoices, (id) => (lodash.includes(invoiceIds, id)));
    this.setState({
      checkedInvoices: checkedIds,
      exportLink: this._calculateExportLink(this.state.invoices, checkedIds)
    });
  }

  render() {
    return this.state.isMasterDataReady && (
      <InvoiceOverviewMarkup
        onSearch={::this.handleSearchInvoices}
        onEventSend={::this.handleEventSend}
        invoices={this.state.invoices}
        transitions={this.state.transitions}
        checkedInvoices={this.state.checkedInvoices}
        statuses={this.state.statuses}
        statusLabel={::this.statusLabel}
        pagination={this.state.pagination}
        editInvoiceId={this.state.editInvoiceId}
        onEdit={::this.handleEditInvoice}
        onDelete={::this.handleDeleteInvoice}
        onCancel={::this.handleCancel}
        showDeleteModal={::this.showDeleteModal}
        hideDeleteModal={::this.hideDeleteModal}
        deleteModal={this.state.deleteModal}
        isEditable={::this.isEditable}
        markForExport={::this.markForExport}
        unMarkForExport={::this.unMarkForExport}
        exportLink={this.state.exportLink}
        readOnly={this.props.readOnly}
      />
    )
  }

}
