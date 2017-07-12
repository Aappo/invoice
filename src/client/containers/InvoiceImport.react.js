import React, { PropTypes, Component } from 'react';
import InvoiceImportMarkup from '../components/InvoiceImport';
import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';
import { INVOICE_IMPORT_CHUNK_SIZE } from '../constants/invoiceImport';
import _ from 'lodash';
import messages from './i18n/InvoiceImport';

export default class InvoiceImport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      importInProgress: false,
      importPercentage: 0,
      importSize: 0,
      importResult: []
    };
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.context.i18n.register('InvoiceImport', messages);
  }

  _calculateImportPercentage(currentPercentage = 0, importSize) {
    if (_.isNil(importSize) || importSize === 0) {
      return 100;
    }
    return currentPercentage + INVOICE_IMPORT_CHUNK_SIZE / importSize * 100;
  };

  handleImportInvoices(invoices) {
    return Promise.resolve(this.setState({ importSize: _.size(invoices), importInProgress: true })
    ).then(() => Promise.all(
      _(invoices).chunk(INVOICE_IMPORT_CHUNK_SIZE).map((invoiceChunk) => {
        return request.post(`/invoice/api/invoices/import`).set(
          'Accept', 'application/json'
        ).send(invoiceChunk).then((response) => {
          return Promise.resolve(this.setState({
            importResult: this.state.importResult.concat(response.body),
            importPercentage: this._calculateImportPercentage(this.state.importPercentage, this.state.importSize)
          }));
        })
      })
    )).then(() => this.setState({ importInProgress: false, importSize: 0, importPercentage: 0 }));
  }

  cleanImportResult() {
    this.setState({ importInProgress: false, importPercentage: 0, importSize: 0, importResult: [] });
  }

  render() {
    return (
      <div>
        <InvoiceImportMarkup
          onImport={::this.handleImportInvoices}
          importInProgress={this.state.importInProgress}
          importPercentage={this.state.importPercentage}
          importResult={this.state.importResult}
          cleanImportResult={::this.cleanImportResult}
        />
      </div>
    );
  }
}
