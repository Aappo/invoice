import React, { Component, PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';
import FormGroupMarkup from '../FormGroupMarkup/index';
import { Decorator as FormsyElement } from 'formsy-react';

@FormsyElement()
export default class FormsyDateRange extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    values: PropTypes.array,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    toOptionConverter: PropTypes.func.isRequired,
    defaultOption: PropTypes.object,
    isPristine: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    required: false,
    values: []
  };

  render() {
    return (
      <FormGroupMarkup
        error={this.props.isPristine() ? null : this.props.getErrorMessage()}
        label={this.props.label}
        required={this.props.required}
      >
        <FormControl
          componentClass="select"
          value={this.props.getValue() || ''}
          onChange={(e) => this.props.setValue(e.currentTarget.value || undefined)}
          onBlur={(e) => this.props.isPristine() && this.props.setValue(this.props.getValue())}
          disabled={this.props.disabled}
        >
          {this.props.defaultOption ? this.props.defaultOption : null}
          {this.props.values.map(this.props.toOptionConverter)}
        </FormControl>
      </FormGroupMarkup>
    )
  }
}
