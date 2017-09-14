import React, { PropTypes } from 'react';
import { Icon } from '@opuscapita/react-icons';
import './comments.less';

const getCommentBadge = (status) => {
  switch (status) {
    case 'inspectionRequired':
      return <Icon type="indicator" name="pinned"/>;
    case 'approvalRequired':
      return <Icon type="indicator" name="inspected"/>;
    case 'approved':
      return <Icon type="indicator" name="inspectedAndApproved"/>;
    case 'inspClrRequired':
      return <Icon type="indicator" name="inClarification"/>;
    case 'appClrRequired':
      return <Icon type="indicator" name="inClarification"/>;
    default:
      return null;
  }
};

const getCommnetView = (commentData, i18n) => {
  if (commentData.event) {
    return (
      <div>
        <div className="oc-invoices-icon-inline">
          {getCommentBadge(commentData.status)}
          <span className="oc-invoices-card-value">
            {i18n.getMessage(`TaskItem.status.${commentData.status}`)}
          </span>
        </div>
        <div className="oc-invoices-card-value">
          {commentData.message}
        </div>
      </div>
    );
  } else {
    return (
      <div className="oc-invoices-icon-inline">
        <Icon type="indicator" name="commented"/>
        <span className="oc-invoices-card-value">
            {commentData.message}
          </span>
      </div>
    );
  }
};

const CommentHistoryView = ({ comments }, { i18n }) => (
  <div className="oc-invoices-card">
    {comments.length > 0 ? comments.map((commentData, idx) => (
      <div key={`${commentData.date}_${idx}`} className="oc-invoices-comment">
        {getCommnetView(commentData, i18n)}
        <span className="oc-invoices-card-comment-info">
          {`${i18n.formatDateTime(commentData.date)} ${commentData.firstName} ${commentData.lastName} (${commentData.id})`}
        </span>
      </div>
    )) : i18n.getMessage('Details.comments.noComments')}
  </div>
);

CommentHistoryView.propTypes = {
  comments: PropTypes.array.isRequired
};

CommentHistoryView.contextTypes = {
  i18n: PropTypes.object.isRequired
};

CommentHistoryView.defaultProps = {
  comments: []
};

export default CommentHistoryView;
