import React, { PropTypes } from 'react';
import { Icon } from '@opuscapita/react-icons';

const AttachmentDetailsView = ({ attachments }) => (
  <div className="oc-invoices-card">
    <div className="oc-invoices-attachment-container">
      {attachments.map((attachmentInfo) => (
        <div key={attachmentInfo.name} className="oc-invoices-file-icon">
          <Icon type="invoices" name={attachmentInfo.extension.slice(1)}/>
          <span>
          {attachmentInfo.name}
        </span>
        </div>
      ))}
    </div>
  </div>
);

AttachmentDetailsView.propTypes = {
  attachments: PropTypes.array
};

AttachmentDetailsView.defaultProps = {
  attachments: []
};

export default AttachmentDetailsView;
