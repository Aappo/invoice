import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Button, Glyphicon, Table } from 'react-bootstrap';

/**
 * Renders tables with invoice receipt's items
 *
 * @param items
 */
const InvoiceItemsGrid = ({ items, onDelete, readOnly }, context) => (
  <Table key={_.uniqueId()}>
    <thead>
    <tr>
      <th>#</th>
      <th>{context.i18n.getMessage('Labels.productId')} &amp; {context.i18n.getMessage('Labels.description')}</th>
      <th>{context.i18n.getMessage('Labels.status')}</th>
      <th className="text-right">{context.i18n.getMessage('Labels.quantity')}</th>
      <th className="text-right">{context.i18n.getMessage('Labels.price')}</th>
      <th className="text-right">{context.i18n.getMessage('Labels.totalNetPrice')}</th>
      <th className="text-right">{context.i18n.getMessage('Labels.taxRate')}</th>
      <th className="text-right">{context.i18n.getMessage('Labels.taxAmount')}</th>
      <th>{context.i18n.getMessage('Labels.poPoiRef')}</th>
      <th/>
    </tr>
    </thead>
    <tbody>
    {items && items.map((item) => {
      return (
        <tr key={`invoice-receipt-item-${item.key}`}>
          <td>
            {item.orderItemNo}
          </td>
          <td>
            <code>{item.productId}</code>&nbsp;{item.productDescShort}
          </td>
          <td className="text-left">
              <span className="label label-default">
                <nobr>
                  {item.statusId}
                </nobr>
              </span>
          </td>
          <td className="text-right">
            {item.quantity}&nbsp;{item.uomId}
          </td>
          <td className="text-right">
            {item.netPrice}&nbsp;{item.currencyId || '-'}/{item.priceUnit}
          </td>
          <td className="text-right">
            {item.totalNetPrice}&nbsp;{item.currency || '-'}
          </td>
          <td className="text-right">
            {item.taxRate || '-'}
          </td>
          <td className="text-right">
            {item.taxAmount || '-'}
          </td>
          <td>
            {(item.purchaseOrderId || item.purchaseOrderItemNo) ?
                `${item.purchaseOrderId || ''}/${item.purchaseOrderItemNo || ''}` : 'n/a'}
          </td>
          {readOnly ?
            <td className="invoice-btn-group">
              <Button bsStyle="link" onClick={_.noop}>
                <Glyphicon glyph="eye-open"/>
              </Button>
            </td> :
            <td className="invoice-btn-group">
              <Button bsStyle="link" onClick={_.noop}>
                <Glyphicon glyph="edit"/>
              </Button>
              <Button
                bsStyle="link"
                onClick={() => onDelete(item.key)}
              >
                <Glyphicon glyph="trash"/>
              </Button>
            </td>
          }
        </tr>
      )
    })
    }
    </tbody>
  </Table>
);

InvoiceItemsGrid.propTypes = {
  items: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  readOnly: PropTypes.bool
};

InvoiceItemsGrid.contextTypes = {
  i18n: PropTypes.object.isRequired
};

InvoiceItemsGrid.defaultProps = {
  readOnly: false
};

export default InvoiceItemsGrid;
