import React, { PropTypes, Component } from 'react';
import Formsy from 'formsy-react';
import FormsyTextInput from '../../../common/form-components/FormsyTextInput.react';
import FormsyDateInput from '../../../common/form-components/FormsyDateInput.react';
import FormsyDateRange from '../../../common/form-components/FormsyDateRange.react';
import FormsySelect from '../../../common/form-components/FormsySelect.react';
import FormGroupMarkup from '../../../common/FormGroupMarkup/index';
import InvoiceHeaderStaticFields from './InvoiceHeaderStaticFields.react';
import lodash from 'lodash';
import constraints from './InvoiceFormConstraints';
import { validateForm } from '../../../common/form-components/validateForm';
const validate = validateForm(constraints);

export default class InvoiceForm extends Component {

  static propTypes = {
    invoice: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    supplier: PropTypes.object.isRequired,
    supplierAddresses: PropTypes.array,
    supplierContacts: PropTypes.array,
    termsOfDelivery: PropTypes.array.isRequired,
    termsOfPayment: PropTypes.array.isRequired,
    methodsOfPayment: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    formHeader: PropTypes.string,
    statusLabel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    displayMode: PropTypes.oneOf(['one-column', 'two-column']),
    readOnly: PropTypes.bool
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    supplierAddresses: [],
    supplierContacts: [],
    displayMode: 'two-column',
    readOnly: false
  };

  constructor(props) {
    super(props);
    this.state = {
      validationErrors: {}
    };
  }

  _mapInputs(inputs) {
    /* eslint-disable no-param-reassign */
    return lodash.transform(inputs, (result, value, key) => {
      if (key === 'periodOfService' && !lodash.isNil(value)) {
        result.periodOfServiceFrom = value.from;
        result.periodOfServiceTo = value.to;
      } else {
        result[key] = value;
      }
    }, {});
    /* eslint-enable no-param-reassign */
  }

  _submitForm(model, resetForm, invalidateForm) {
    const errors = validate(model);
    if (lodash.isEmpty(errors)) {
      this.props.onSave(model, resetForm);
    } else {
      invalidateForm(errors);
    }
  }

  render() {
    const {
      formHeader,
      customer,
      supplier,
      supplierAddresses,
      supplierContacts,
      invoice,
      statusLabel,
      termsOfPayment,
      methodsOfPayment,
      termsOfDelivery,
      currencies,
      onCancel,
      displayMode,
      readOnly
      } = this.props;
    const leftColumnFields = [
      <InvoiceHeaderStaticFields
        key='headerFields'
        supplier={supplier}
        supplierAddresses={supplierAddresses}
        supplierContacts={supplierContacts}
        customer={customer}
      />,
      <FormsyDateInput
        key='invoicedOn'
        label="Labels.invoicedOn"
        name='invoicedOn'
        required={true}
        value={invoice.invoicedOn}
        disabled={readOnly}
      />,
      <FormsyDateRange
        key='periodOfService'
        label="Labels.periodOfService"
        name="periodOfService"
        value={{ from: invoice.periodOfServiceFrom, to: invoice.periodOfServiceTo }}
        disabled={readOnly}
      />
    ];

    const rightColumnFields = [
      <FormGroupMarkup label="Labels.status" key='status'>
                <span className="label label-default">
                  <nobr>
                    {statusLabel(invoice.status)}
                  </nobr>
                </span>
      </FormGroupMarkup>,
      <FormsyDateInput
        key='dueDate'
        label="Labels.dueDate"
        name='dueDate'
        value={invoice.dueDate}
        disabled={readOnly}
      />,
      <FormsySelect
        key='termsOfPaymentId'
        label="Labels.termsOfPayment"
        name="termsOfPaymentId"
        required={true}
        value={invoice.termsOfPaymentId}
        values={termsOfPayment}
        toOptionConverter={
          (tod) => (
            <option key={`term-of-payment-${tod.id}`} value={tod.id}>
              {tod.description ? tod.description : tod.id}
            </option>
          )
        }
        defaultOption={<option value="" defaultValue={true}/>}
        disabled={readOnly}
      />
    ];


    return (
      <Formsy.Form
        onSubmit={::this._submitForm}
        validationErrors={this.state.validationErrors}
        mapping={this._mapInputs}
        onChange={(currentValues) => this.setState({ validationErrors: validate(currentValues) })}
      >
        {formHeader && <h1>{formHeader}</h1>}
        <div className="form-horizontal">
          <div className="row">
            {displayMode === 'one-column' ? <div className="col-sm-12">
              {leftColumnFields.map((input => input))}
              {rightColumnFields.map((input => input))}
            </div> : <div>
              <div className="col-md-6">
                {leftColumnFields.map((input => input))}
              </div>
              <div className="col-md-6">
                {rightColumnFields.map((input => input))}
              </div>
            </div>
            }
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6">
              <FormsySelect
                label="Labels.currency"
                name="currencyId"
                required={true}
                value={invoice.currencyId}
                values={currencies}
                toOptionConverter={
                  (currency) => (
                    <option key={`currency-${currency.id}`} value={currency.id}>
                      {currency.name}
                    </option>
                  )
                }
                defaultOption={<option value="" defaultValue={true}/>}
                disabled={readOnly}
              />
            </div>
            <div className="col-md-6">
              <FormsyTextInput
                label="Labels.orderNumber"
                name='orderNumber'
                value={invoice.orderNumber}
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="form-submit text-right">
            {onCancel ?
              <button className="btn btn-link" type="button" onClick={() => onCancel()}>
                {this.context.i18n.getMessage('Commands.cancel')}
              </button> : null
            }
            {!readOnly ?
              <button className="btn btn-primary" type="submit">
                {this.context.i18n.getMessage('Commands.save')}
              </button> : null
            }
          </div>
        </div>
      </Formsy.Form>
    )
  }
}
