import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextInput } from '../common/redux-form';
import { CREATE_INVOICE_FORM } from '../../constants/forms';
import _ from 'lodash';

const SelectCustomerWizard = ({handleSubmit, onSelectCustomer}, context) => (
  <div>
    <h1>{context.i18n.getMessage('CreateInvoice.header')}</h1>
    <div className="form-horizontal">
      <form>
        <div className="row">
          <div className="col-md-6">
            <Field
              label="CreateInvoice.customer"
              name='invoice.customerId'
              component={renderTextInput}
              required={true}
            />
          </div>
        </div>
        <div className="form-submit text-right">
          <button className="btn btn-primary" type="button" onClick={handleSubmit((values) => (
            onSelectCustomer(values.invoice.customerId)
          ))}>
            {context.i18n.getMessage('CreateInvoice.next')}
          </button>
        </div>
      </form>
    </div>
  </div>
);

SelectCustomerWizard.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default reduxForm({
  form: CREATE_INVOICE_FORM,
  initialValues: {
    invoice: {}
  }
})(SelectCustomerWizard);
