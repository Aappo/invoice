import React, { PropTypes, Component } from 'react';
import { sendInvoiceEvent } from '../data/fetchers';
import ActionsTabs from './ActionsTabs.react';
import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';

export default class Actions extends Component {

  static propTypes = {
    invoice: PropTypes.object,
    updateInvoice: PropTypes.func.isRequired
  };

  /**
   * Generic invoice update with payload.
   *
   * @param invoiceId
   * @param payload
   * @returns {Promise.<TResult>}
   */
  handleUpdateInvoice(invoiceId, payload) {
    return request.put(`/invoice/api/invoices/${invoiceId}`).set(
      'Accept', 'application/json'
    ).send(payload).then((response) => Promise.resolve(response.body)
    ).catch((error) => {
      throw Error(error);
    });
  }

  handleSendEvent(invoiceId, payload, event) {
    return this.props.updateInvoice(invoiceId, invoice => {
      return sendInvoiceEvent(invoice.id, event).then(invoice =>
        invoice.commentary !== payload.commentary ? this.handleUpdateInvoice(invoice.id, payload) : Promise.resolve(invoice)
      )
    })
  }

  handlePostComment(invoiceId, payload) {
    return this.props.updateInvoice(invoiceId, invoice => {
      return invoice.commentary !== payload.commentary ? this.handleUpdateInvoice(invoice.id, payload) : Promise.resolve(invoice)
    })
  }

  /**
   * Creates a set of actions available for specified invoice.
   * Single action is an object of format { name: {String}, handler: {Function(payload)} }.
   *
   * @param invoice
   * @returns {Array|*}
   */
  getActionsForInvoice(invoice) {
    const actions = invoice.transitions.map(transition => {
      return {
        name: transition.event,
        handler: payload => this.handleSendEvent(invoice.id, payload, transition.event)
      }
    });
    actions.push({ name: 'postComment', handler: payload => this.handlePostComment(invoice.id, payload) });
    return actions;
  }

  render() {
    return (
      <ActionsTabs
        invoice={this.props.invoice}
        actions={this.props.invoice ? this.getActionsForInvoice(this.props.invoice) : []}
      />
    );
  }
}
