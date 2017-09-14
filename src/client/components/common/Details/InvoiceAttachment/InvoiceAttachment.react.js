import React, {PropTypes} from 'react';

const InvoiceAttachment = ({invoice}) => (
  <object
    type="application/pdf"
    width="100%"
    name="invoice_image"
    height="100%"
    data={`/invoice/api/invoices/${invoice.id}/attachments/image`}
    aria-label="Invoice image"
  />
);

InvoiceAttachment.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default InvoiceAttachment;
