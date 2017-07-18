import React, { PropTypes, Component } from 'react';
import {
  FormGroup,
  FormControl,
  Button,
  ButtonGroup
} from 'react-bootstrap';
import './Action.less';


class Action extends Component {
  static propTypes = {
    invoice: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div id="action">
        <div id="oc-invoices-invoice-enquiry">
          <div className="oc-invoices-invoice-card">
            <div className="oc-invoices-invoice-card-header">
              Approval
            </div>
            <div className="oc-invoices-invoice-card-content">
              Approve and comment
              <form>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl
                    componentClass="textarea"
                    placeholder="Comment"
                  />
                </FormGroup>
              </form>
            </div>
            <ButtonGroup>
              <Button id="enquiry-ok">Approve</Button>
              <Button id="enquiry-ok">Reject</Button>
              <Button id="enquiry-ok">Approve</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Action;
