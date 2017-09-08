import React, { PropTypes } from 'react';
import {
  sendInvoiceEventHandler,
  updateInvoiceCommentHandler
} from '../data/updateHandlers';
import ActionsTabs from './ActionsTabs.react';
import { OCAlert } from '@opuscapita/react-alerts';

/**
 * Creates a set of actions available for specified invoice.
 * Single action is an object of format { name: {String}, handler: {Function(payload)} }.
 */
const Actions = ({ invoice, updateInvoice }, {i18n}) => {

  const failedMessageHandler = (errors) => (
    OCAlert.alertError(
      i18n.getMessage('Commentary length is exceeded, please try to shorten it.')
    )
  );

  const actions = invoice.transitions.map(transition => {
    return {
      name: transition.event,
      handler: payload => updateInvoice(invoice.id, invoice => {
        return sendInvoiceEventHandler(
          invoice.id,
          transition.event
        ).then(invoice => updateInvoiceCommentHandler(
          invoice.id,
          {
            message: payload.commentary,
            event: transition.event,
            status: invoice.status
          }
        )).then(() => OCAlert.alertSuccess(
          i18n.getMessage(`Action.message.${transition.event}`, 1000)
        )).catch(failedMessageHandler)
      })
    }
  });

  actions.push({
    name: 'postComment',
    handler: payload => updateInvoice(
      invoice.id,
      invoice => updateInvoiceCommentHandler(
        invoice.id,
        {
          message: payload.commentary,
          status: invoice.status
        }
      )).catch(failedMessageHandler)
  });

  return (
    <ActionsTabs invoice={invoice} actions={actions}/>
  );
};

Actions.propTypes = {
  invoice: PropTypes.object.isRequired,
  updateInvoice: PropTypes.func.isRequired
};

Actions.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default Actions;
