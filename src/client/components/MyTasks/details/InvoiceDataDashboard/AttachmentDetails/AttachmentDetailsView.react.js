import React, { PropTypes } from 'react';
import { Icon } from '@opuscapita/react-icons';

const AttachmentDetailsView = ({ attachments }, {i18n}) => (
  <div className="oc-invoices-card">
    <div className="oc-invoices-attachment-container">
      {attachments.length > 0? attachments.map((attachmentInfo) => (
        <div key={attachmentInfo.name} className="oc-invoices-file-icon">
          <Icon type="invoices" name={attachmentInfo.extension.slice(1)}/>
          <span>
          {attachmentInfo.name}
        </span>
        </div>
      )) : i18n.getMessage('Details.attachments.noAttachments')}
    </div>
  </div>
);

AttachmentDetailsView.propTypes = {
  attachments: PropTypes.array
};

AttachmentDetailsView.contextTypes = {
  i18n: PropTypes.object.isRequired
};

AttachmentDetailsView.defaultProps = {
  attachments: []
};

export default AttachmentDetailsView;
