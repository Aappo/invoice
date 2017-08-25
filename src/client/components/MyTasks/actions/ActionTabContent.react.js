import React, { PropTypes } from 'react';
import {
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
const COMMENTARY_MAX_SIZE = 2000;

const ActionTabContent = ({ actionName, onAction, onTextAreaChange, commentary, readOnly }, { i18n }) => (
  <div id="action">
    <div id="oc-invoices-invoice-enquiry">
      <div className="oc-invoices-invoice-card">
        <div className="oc-invoices-invoice-card-content">
          {`${i18n.getMessage('Action.headerLabel')} (${commentary.length}/${COMMENTARY_MAX_SIZE})`}
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              componentClass="textarea"
              placeholder="Comment"
              readOnly={readOnly}
              rows="1"
              value={commentary}
              onChange={(e) => e.target.value.length <= COMMENTARY_MAX_SIZE && onTextAreaChange(e.target.value)}
            />
          </FormGroup>
        </div>
        {!readOnly && <div className="center-block">
          <Button
            bsStyle="primary"
            key={`${actionName}`}
            onClick={onAction}
          >
            {i18n.getMessage(`Action.event.${actionName}`)}
          </Button>
        </div>}
      </div>
    </div>
  </div>
);

ActionTabContent.propTypes = {
  actionName: PropTypes.string,
  onAction: PropTypes.func.isRequired,
  onTextAreaChange: PropTypes.func.isRequired,
  commentary: PropTypes.string.isRequired,
  readOnly: PropTypes.bool
};

ActionTabContent.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default ActionTabContent;
