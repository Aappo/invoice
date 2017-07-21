import React, { PropTypes } from 'react';
import lodash from 'lodash';
import MessageInfo from '../../../common/MessageInfo.react';
import {
  Button,
  Table,
  Glyphicon,
  Checkbox,
  ButtonGroup,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

const SearchResult = ({
  invoices,
  statusLabel,
  onEdit,
  onDelete,
  isEditable,
  selectedInvoiceId,
  checkedInvoices,
  markForExport,
  unMarkForExport,
  transitions,
  onEventSend
  },
  context) => {
  if (lodash.size(invoices) === 0) {
    return (
      <MessageInfo message="No Items"/>
    );
  } else {
    return (
      <Table responsive={true}>
        <thead>
        <tr>
          <th className="text-nowrap">
            <Checkbox
              onChange={e => {
                let invoiceKeys = lodash.map(invoices, 'id');
                return e.target.checked ? markForExport(invoiceKeys) : unMarkForExport(invoiceKeys)
              }}
              checked={lodash.size(checkedInvoices) === lodash.size(invoices)}
            />
          </th>
          <th className="text-nowrap">{context.i18n.getMessage('Labels.customer')}</th>
          <th className="text-nowrap">{context.i18n.getMessage('Labels.invoicedOn')}</th>
          <th className="text-nowrap">{context.i18n.getMessage('Labels.dueDate')}</th>
          <th className="text-nowrap">{context.i18n.getMessage('Labels.totalGrossPrice')}</th>
          <th className="text-nowrap">{context.i18n.getMessage('Labels.status')}</th>
          <th className="text-nowrap"/>
        </tr>
        </thead>
        <tbody>
        {
          invoices.map((inv) => {
            return (
              <tr key={inv.id} className={inv.id === selectedInvoiceId ? 'success' : ''}>
                <td>
                  <Checkbox
                    onChange={(e) => (e.target.checked ? markForExport([inv.id]) : unMarkForExport([inv.id]))}
                    checked={lodash.includes(checkedInvoices, inv.id)}
                  />
                </td>
                <td>
                  {inv.customerId}
                  <br/>
                  <code>{inv.customerId}</code>
                </td>
                <td>
                  {context.i18n.formatDate(inv.invoicedOn)}
                </td>
                <td>
                  {context.i18n.formatDate(inv.dueDate)}
                </td>
                <td>
                  {inv.totalGrossPrice}&nbsp;{inv.currency}
                </td>
                <td>
                  <span className="label label-default">{statusLabel(inv.status)}</span>
                </td>
                <td className="invoice-btn-group text-right">
                  {transitions[inv.id].length > 0 && <ButtonGroup>
                    <DropdownButton bsSize="small" title="Approval" id="bg-nested-dropdown" pullRight>
                      {transitions[inv.id].map((transition) => {
                        return (
                          <MenuItem
                            key={`${inv.id}_${transition.event}`}
                            eventKey={inv.id}
                            onClick={() => {
                            onEventSend(inv.id, transition.event)
                          }}
                          >
                            {transition.event}
                          </MenuItem>
                        );
                      })}
                    </DropdownButton>
                  </ButtonGroup>}
                  <Button bsSize="small" onClick={() => onEdit(inv.id)}>
                    {isEditable(inv.status) ? <Glyphicon glyph="edit"/> : <Glyphicon glyph="eye-open"/>}
                  </Button>
                  {isEditable(inv.status) && <Button bsSize="small" onClick={() => onDelete(inv.id)}>
                    <Glyphicon glyph="trash"/>
                  </Button>}
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    );
  }
};

SearchResult.propTypes = {
  invoices: PropTypes.array,
  transitions: PropTypes.object,
  statusLabel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isEditable: PropTypes.func.isRequired,
  selectedInvoiceId: PropTypes.number,
  markForExport: PropTypes.func.isRequired,
  unMarkForExport: PropTypes.func.isRequired,
  onEventSend: PropTypes.func.isRequired,
  checkedInvoices: PropTypes.array
};

SearchResult.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default SearchResult;
