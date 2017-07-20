import React, { PropTypes, Component } from 'react';
import {
  FormGroup,
  FormControl,
  Button,
  ButtonGroup
} from 'react-bootstrap';
import './Action.less';
import { sendInvoiceEvent } from '../data/fetchers';


export default class Action extends Component {
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
      commentary: props.invoice ? (props.invoice.commentary && '') : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { invoice } = nextProps;
    if (invoice && this.state.commentary !== invoice.commentary) {
      this.setState({ commentary: invoice.commentary ? invoice.commentary : '' })
    }
  }

  handleSendEvent(id, event) {
    return this.props.updateInvoice(id, (invoice) => {
      return sendInvoiceEvent(invoice.key, event, this.state.commentary)
    })
  }

  render() {
    const { invoice } = this.props;
    const transitions = invoice ? invoice.transitions : [];

    return (
      <div id="action">
        <div id="oc-invoices-invoice-enquiry">
          <div className="oc-invoices-invoice-card">
            <div className="oc-invoices-invoice-card-header">
              {this.context.i18n.getMessage('Action.header')}
            </div>
            <div className="oc-invoices-invoice-card-content">
              {this.context.i18n.getMessage('Action.headerLabel')}
              <form>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl
                    readOnly={transitions.length === 0}
                    componentClass="textarea"
                    placeholder="Comment"
                    value={this.state.commentary}
                    onChange={(e) => this.setState({ commentary: e.target.value })}
                  />
                </FormGroup>
              </form>
            </div>
            <ButtonGroup>
              {transitions.length > 0 && transitions.map((transition) => (
                <Button
                  key={`${invoice.key}_${transition.event}`}
                  onClick={() => this.handleSendEvent(invoice.key, transition.event)}
                >
                  {this.context.i18n.getMessage(`Action.event.${transition.event}`)}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
