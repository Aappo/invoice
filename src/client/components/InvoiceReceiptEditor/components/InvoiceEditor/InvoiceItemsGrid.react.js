import React, { PropTypes } from 'react';
import lodash from 'lodash';
import { Button, Glyphicon, Table } from 'react-bootstrap';

/**
 * Renders tables with invoice receipt's items
 *
 * @param items
 */
const InvoiceItemsGrid = ({ items, onDelete, readOnly }, context) => (
  <Table key={lodash.uniqueId()}>
    <thead>
    <tr>
      <th>#</th>
      <th>{context.i18n.getMessage('Labels.productId')} &amp; {context.i18n.getMessage('Labels.description')}</th>
      <th>{context.i18n.getMessage('Labels.status')}</th>
      <th className="text-right">{context.i18n.getMessage('Labels.quantity')}</th>
      <th className="text-right">{context.i18n.getMessage('Labels.price')}</th>
      <th>{context.i18n.getMessage('Labels.poPoiRef')}</th>
      <th/>
    </tr>
    </thead>
    <tbody>
    {items && items.map((item) => {
      return (
        <tr key={`invoice-receipt-item-${item.id}`}>
          <td>
            {item.orderItemNo}
          </td>
          <td>
            <code>{item.productId}</code>&nbsp;{item.productDescShort}
          </td>
          <td className="text-left">
              <span className="label label-default">
                <nobr>
                  {item.status}
                </nobr>
              </span>
          </td>
          <td className="text-right">
            {item.quantityCharged}&nbsp;{item.unitOfMeasureId}
          </td>
          <td className="text-right">
            {item.netPrice}&nbsp;{item.currencyId || '-'}
          </td>
          <td>
            {item.purchaseOrderId || 'n/a'}
          </td>
          {readOnly ?
            <td className="invoice-btn-group">
              <Button bsStyle="link" onClick={lodash.noop}>
                <Glyphicon glyph="eye-open"/>
              </Button>
            </td> :
            <td className="invoice-btn-group">
              <Button bsStyle="link" onClick={lodash.noop}>
                <Glyphicon glyph="edit"/>
              </Button>
              <Button
                bsStyle="link"
                onClick={() => onDelete(item.id)}
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
