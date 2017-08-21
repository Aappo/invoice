import React, {PropTypes} from 'react';
import { Icon } from '@opuscapita/react-icons';

const AttachmentDetailsView = ({attachments}) => (
  <ul id="attachmentList">
    {attachments.map((attachmentInfo) => (
      <li key={attachmentInfo.name}>
        <Icon type="invoices" name={attachmentInfo.extension.slice(1)}/>
        {attachmentInfo.name}
      </li>
    ))}
  </ul>
);

AttachmentDetailsView.propTypes = {
  attachments: PropTypes.array
};

AttachmentDetailsView.defaultProps = {
  attachments: []
};

export default AttachmentDetailsView;
