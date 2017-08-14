import React, { PropTypes } from 'react';
import {
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
const COMMENTARY_MAX_SIZE = 2000;

const ActionTabContent = ({ transition, onSendEvent, onTextAreaChange, commentary }, { i18n }) => (
  <div id="action">
    <div id="oc-invoices-invoice-enquiry">
      <div className="oc-invoices-invoice-card">
        <div className="oc-invoices-invoice-card-content">
          {`${i18n.getMessage('Action.headerLabel')} (${commentary.length}/${COMMENTARY_MAX_SIZE})`}
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              componentClass="textarea"
              placeholder="Comment"
              readOnly={!transition}
              rows="1"
              value={commentary}
              onChange={(e) => onTextAreaChange(e.target.value, COMMENTARY_MAX_SIZE)}
            />
          </FormGroup>
        </div>
        {transition && <div className="center-block">
          <Button
            bsStyle="primary"
            key={`${transition.event}`}
            onClick={() => onSendEvent(transition.event)}
          >
            {i18n.getMessage(`Action.event.${transition.event}`)}
          </Button>
        </div>}
      </div>
    </div>
  </div>
);

ActionTabContent.propTypes = {
  transition: PropTypes.object,
  onSendEvent: PropTypes.func.isRequired,
  onTextAreaChange: PropTypes.func.isRequired,
  commentary: PropTypes.string.isRequired
};

ActionTabContent.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default ActionTabContent;
