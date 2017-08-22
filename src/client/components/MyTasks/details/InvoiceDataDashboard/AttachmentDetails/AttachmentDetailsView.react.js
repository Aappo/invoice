import React, {PropTypes} from 'react';
import { Icon } from '@opuscapita/react-icons';

import '../cards.less';

const AttachmentDetailsView = ({attachments}) => (
  <div className="oc-invoices-card">
    <ul id="attachmentList">
      {attachments.map((attachmentInfo) => (
        <li key={attachmentInfo.name}>
          <Icon type="invoices" name={attachmentInfo.extension.slice(1)}/>
          {attachmentInfo.name}
        </li>
      ))}
    </ul>
  </div>
);

AttachmentDetailsView.propTypes = {
  attachments: PropTypes.array
};

AttachmentDetailsView.defaultProps = {
  attachments: []
};

export default AttachmentDetailsView;
