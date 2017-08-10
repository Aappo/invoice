import React, { PropTypes, Component } from 'react';
import ActionTabContent from './ActionTabContent.react';
import { sendInvoiceEvent } from '../data/fetchers';
import './Action.less';
import _ from 'lodash';

export default class ActionsTabs extends Component {

  static propTypes = {
    invoice: PropTypes.object,
    updateInvoice: PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      commentary: props.invoice && props.invoice.commentary || '',
      openTransition: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { invoice } = nextProps;
    if (invoice && this.state.commentary !== invoice.commentary) {
      this.setState({
        commentary: invoice.commentary ? invoice.commentary : '',
        openTransition: 0
      })
    }
  }

  handleSendEvent(event) {
    return this.props.updateInvoice(this.props.invoice.id, invoice => {
      return sendInvoiceEvent(invoice.id, event, this.state.commentary)
    })
  }

  render() {
    const { invoice } = this.props;
    const transitions = invoice ? invoice.transitions : [];

    return (
      <div id="actions">
        <div id="header">
          <ul>
            {transitions.length > 0 && transitions.map((transition, idx) => (
              <li key={idx} className={this.state.openTransition === idx ? 'doing' : ''}>
                <a onClick={(e) => this.setState({ openTransition: idx })}>
                  {this.context.i18n.getMessage(`Action.tab.${transition.event}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ActionTabContent
          transition={!_.isEmpty(transitions) ? transitions[this.state.openTransition] : undefined}
          onSendEvent={::this.handleSendEvent}
          onTextAreaChange={(e) => this.setState({ commentary: e.target.value })}
          commentary={this.state.commentary}
        />
      </div>
    );
  }
}
