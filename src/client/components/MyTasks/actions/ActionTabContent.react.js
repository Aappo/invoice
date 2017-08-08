import React, { PropTypes } from 'react';
import {
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

const ActionTabContent = ({ transition, onSendEvent, onTextAreaChange, commentary }, { i18n }) => (
  <div id="action">
    <div id="oc-invoices-invoice-enquiry">
      <div className="oc-invoices-invoice-card">
        <div className="oc-invoices-invoice-card-content">
          {i18n.getMessage('Action.headerLabel')}
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              componentClass="textarea"
              placeholder="Comment"
              readOnly={!transition}
              style={{ resize: 'none' }}
              rows="8"
              value={commentary}
              onChange={onTextAreaChange}
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
