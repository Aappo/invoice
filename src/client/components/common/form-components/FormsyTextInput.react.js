import React, { Component, PropTypes } from 'react';
import FormGroupMarkup from '../FormGroupMarkup/index';
import { FormControl } from 'react-bootstrap';
import { Decorator as FormsyElement } from 'formsy-react';

@FormsyElement()
export default class FormsyTextInput extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
    componentClass: PropTypes.string,
    isPristine: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    required: false
  };

  render() {
    return (
      <FormGroupMarkup
        error={this.props.isPristine() ? null : this.props.getErrorMessage()}
        label={this.props.label}
        required={this.props.required}
      >
        <FormControl
          componentClass={this.props.componentClass ? this.props.componentClass : 'input'}
          value={this.props.getValue() || ''}
          onChange={(e) => this.props.setValue(e.currentTarget.value || undefined)}
          onBlur={(e) => this.props.isPristine() && this.props.setValue(this.props.getValue())}
          disabled={this.props.disabled}
        />
      </FormGroupMarkup>
    )
  }
}
