import React, { PropTypes } from 'react';
import {
  sendInvoiceEventHandler,
  updateInvoiceCommentHandler
} from '../data/updateHandlers';
import ActionsTabs from './ActionsTabs.react';


/**
 * Creates a set of actions available for specified invoice.
 * Single action is an object of format { name: {String}, handler: {Function(payload)} }.
 */
const Actions = ({ invoice, updateInvoice }) => {

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
            event: transition.event
          }
        ))
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
          message: payload.commentary
        }
      ))
  });

  return (
    <ActionsTabs invoice={invoice} actions={actions}/>
  );
};

Actions.propTypes = {
  invoice: PropTypes.object.isRequired,
  updateInvoice: PropTypes.func.isRequired
};

export default Actions;
