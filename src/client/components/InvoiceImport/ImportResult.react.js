import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import lodash from 'lodash';

const importResultLabel = (invoiceImportResult) => {
  let labelModel = {
    labelStyle: 'success',
    message: 'Imported'
  };

  if (invoiceImportResult.updated) {
    labelModel.labelStyle = 'info';
    labelModel.message = 'Updated';
  } else if (invoiceImportResult.failed) {
    labelModel.labelStyle = 'danger';
    labelModel.message = 'Failed';
  }

  return (
    <span className={`label label-${labelModel.labelStyle}`}>{labelModel.message}</span>
  );
};

const renderInvoiceItemsStatistic = (itemsImportResult) => {
  return (
    <span>
      <span className={`label label-success invoiceItemBadge`}>{itemsImportResult.created}</span>{` / `}
      <span className={`label label-danger invoiceItemBadge`}>{itemsImportResult.failed}</span>
    </span>
  );
};

const ImportResult = ({ importStatistics, cleanImportResult }, { i18n }) => (
  <Table responsive={true}>
    <thead>
    <tr>
      <th className="text-nowrap">Imported Result</th>
      <th className="text-nowrap">Purchase Invoice Items</th>
      <th className="text-nowrap">
        <button className="btn btn-default" onClick={cleanImportResult}>Close</button>
      </th>
    </tr>
    </thead>
    <tbody>
    {
      importStatistics.map(invoiceImportResult => {
        return (
          <tr key={invoiceImportResult.purchaseInvoiceId || lodash.uniqueId()}>
            <td>
              {importResultLabel(invoiceImportResult)}
            </td>
            <td colSpan="2">
              {!lodash.isEmpty(invoiceImportResult.items) && renderInvoiceItemsStatistic(invoiceImportResult.items)}
            </td>
          </tr>
        );
      })
    }
    </tbody>
  </Table>
);

ImportResult.propTypes = {
  importStatistics: PropTypes.array.isRequired,
  cleanImportResult: PropTypes.func.isRequired
};

ImportResult.defaultProps = {
  importStatistics: []
};

ImportResult.contextTypes = {
  i18n: PropTypes.object.isRequired
};


export default ImportResult;
