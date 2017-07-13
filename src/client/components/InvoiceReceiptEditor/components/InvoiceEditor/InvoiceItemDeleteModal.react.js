import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

const InvoiceItemDeleteModal = ({ isShown, onDelete, onCancel, invoiceItemId }, context) => {
  return (
    <Modal show={isShown} keyboard={true}>
      <Modal.Header>
        <Modal.Title>
          {context.i18n.getMessage('Labels.areYouSure')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {context.i18n.getMessage('Labels.questionInvoiceItemDelete')}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-link" onClick={onCancel}>{context.i18n.getMessage('Labels.cancel')}</button>
        <button className="btn btn-primary" onClick={() => onDelete(invoiceItemId)}>
          {context.i18n.getMessage('Labels.ok')}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

InvoiceItemDeleteModal.propTypes = {
  isShown: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  invoiceItemId: PropTypes.number
};

InvoiceItemDeleteModal.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default InvoiceItemDeleteModal;
