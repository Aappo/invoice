import React, { PropTypes, PureComponent } from 'react';
import Formsy from 'formsy-react';
import FormsyTextInput from '../common/form-components/FormsyTextInput.react';
import FormsyDateRange from '../common/form-components/FormsyDateRange.react';
import { Button } from 'react-bootstrap';
import lodash from 'lodash';
import { validateForm } from '../common/form-components/validateForm';

const constraints = {
  "id": {
    presence: {
      message: "^GlAccount.isRequired"
    }
  },

  "customerId": {
    presence: {
      message: "^GlAccount.isRequired"
    }
  }
};
const validate = validateForm(constraints);

export default class GlAccountForm extends PureComponent {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    formHeader: PropTypes.string,
    formValue: PropTypes.object,
    mode: PropTypes.oneOf(['edit', 'create'])
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    formValue: { validRange: {} }
  };

  state = {
    validationErrors: {},
    disableSubmitButton: false
  };

  _submitForm(model, resetForm, invalidateForm) {
    const errors = validate(model);
    if (lodash.isEmpty(errors)) {
      this.props.onSubmit(model, resetForm, invalidateForm);
    } else {
      invalidateForm(errors);
    }
  }

  _mapInputs(inputs) {
    return {
      ...lodash.omit(inputs, 'validRange'),
      validFrom: inputs.validRange.from,
      validTo: inputs.validRange.to
    };
  }

  render() {
    const { i18n } = this.context;
    const { onCancel, formHeader, formValue, mode } = this.props;
    return (
      <Formsy.Form
        ref="glAccountForm"
        onSubmit={::this._submitForm}
        onInvalid={() => (this.setState({ disableSubmitButton: false }))}
        onValid={() => (this.setState({ disableSubmitButton: false }))}
        mapping={this._mapInputs}
        onChange={(currentValues) => this.setState({ validationErrors: validate(currentValues) })}
        validationErrors={this.state.validationErrors}
      >
        {formHeader && <h1>{formHeader}</h1>}
        <div className="form-horizontal">
          <div className="row">
            <div className="col-md-6">
              <FormsyTextInput
                disabled={mode === 'edit'}
                required={true}
                label={i18n.getMessage('GlAccount.customerId')}
                name="customerId"
                value={formValue.customerId}
              />
              <FormsyTextInput
                disabled={mode === 'edit'}
                required={true}
                label={i18n.getMessage('GlAccount.id')}
                name="id"
                value={formValue.id}
              />
              <FormsyTextInput
                label={i18n.getMessage('GlAccount.accountType')}
                name="accountType"
                value={formValue.accountType}
              />
            </div>
            <div className="col-md-6">
              <FormsyTextInput
                label={i18n.getMessage('GlAccount.shortDescription')}
                name="shortDescription"
                value={formValue.shortDescription}
              />
              <FormsyDateRange
                label={i18n.getMessage('GlAccount.validRange')}
                name="validRange"
                value={{ from: formValue.validFrom, to: formValue.validTo }}
              />
            </div>
          </div>
          <div className="form-submit form-submit text-right">
            <Button type="reset" bsStyle="link" onClick={() => (this.refs.glAccountForm.reset())}>
              {i18n.getMessage('GlAccount.reset')}
            </Button>
            <Button bsStyle="default" onClick={onCancel}>
              {i18n.getMessage('GlAccount.cancelButton')}
            </Button>
            <Button type="submit" bsStyle="primary" disabled={this.state.disableSubmitButton}>
              {i18n.getMessage('GlAccount.save')}
            </Button>
          </div>
        </div>
      </Formsy.Form>
    );
  }
}
