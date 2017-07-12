import React, { PropTypes, Component } from 'react';
import SearchResult from './SearchResult.react'
import SearchForm from './SearchForm.react';
import { Pagination } from 'react-bootstrap';
import { COUNT } from '../../../../constants/pagination';
import InvoiceDeleteModal from "./InvoiceDeleteModal.react";
import { SplitScreenInvoiceEditor } from '../InvoiceEditor';
import ActionBar from './ActionBar.react';

export default class InvoiceOverviewMarkup extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    showDeleteModal: PropTypes.func.isRequired,
    invoices: PropTypes.array,
    statuses: PropTypes.array.isRequired,
    statusLabel: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
    deleteModal: PropTypes.object.isRequired,
    editInvoiceId: PropTypes.number,
    isEditable: PropTypes.func.isRequired,
    markForExport: PropTypes.func.isRequired,
    unMarkForExport: PropTypes.func.isRequired,
    exportLink: PropTypes.string.isRequired,
    checkedInvoices: PropTypes.array
  };

  render() {
    return (
      <div className="invoice-overview">
        <div className="row">
          <div className="col-md-12">
            <SearchForm ref="searchForm" onSearch={this.props.onSearch} statuses={this.props.statuses}/>
            <br/>
            <SearchResult
              invoices={this.props.invoices}
              statusLabel={this.props.statusLabel}
              onEdit={this.props.onEdit}
              showDeleteModal={this.props.showDeleteModal}
              isEditable={this.props.isEditable}
              selectedInvoiceId={this.props.editInvoiceId}
              checkedInvoices={this.props.checkedInvoices}
              markForExport={this.props.markForExport}
              unMarkForExport={this.props.unMarkForExport}
            />
            <br/>
            <ActionBar exportLink={this.props.exportLink}/>
            <Pagination
              className={this.props.pagination.last === this.props.pagination.length ? 'hidden' : 'shown'}
              prev={true}
              next={true}
              ellipsis={true}
              boundaryLinks={true}
              items={Math.ceil(this.props.pagination.length / COUNT)}
              maxButtons={3}
              activePage={1 + Math.floor(this.props.pagination.first / COUNT)}
              onSelect={(e) => this.props.onSearch(this.refs.searchForm.refs.searchFormMarkup.getModel(),
                COUNT * (e - 1), COUNT)}
            />
          </div>
        </div>
        <br/><br/>
        <div className="row">
          <SplitScreenInvoiceEditor invoiceId={this.props.editInvoiceId} onCancel={this.props.onCancel}/>
          {/*<div className="col-md-6">*/}
            {/*/!* Rendering static pdf for test purposes *!/*/}
            {/*<object width="100%" height="100%"*/}
              {/*data={this.props.editInvoiceId ? "/invoice/static/test_workarea/invoiceReceipt_TEST.pdf" : ''}*/}
            {/*/>*/}
          {/*</div>*/}
          {/*<div className="col-md-6">*/}
            {/*<InvoiceEditor invoiceId={this.props.editInvoiceId} onCancel={this.props.onCancel}/>*/}
          {/*</div>*/}
        </div>
        <InvoiceDeleteModal {...this.props.deleteModal}
          onDelete={(id) => this.props.onDelete(id, this.refs.searchForm.refs.searchFormMarkup.getModel())}
          onCancel={() => this.props.showDeleteModal({ isShown: false })}
        />
      </div>
    )
  }
}
