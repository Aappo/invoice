import React, { Component, PropTypes } from 'react';
import FormGroupMarkup from '../FormGroupMarkup/index';
import DateRangeInput from '@opuscapita/react-dates/lib/DateRangeInput';
import { Decorator as FormsyElement } from 'formsy-react';
import { parseDate } from './parseDate';

@FormsyElement()
export default class FormsyDateRange extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.object,
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
    let fromToValue = this.props.getValue(); // should be an object {from: Date/String, to: Date/String}
    return (
      <FormGroupMarkup
        error={this.props.isPristine() ? null : this.props.getErrorMessage()}
        label={this.props.label}
        required={this.props.required}
      >
        <DateRangeInput
          locale={this.context.i18n.locale}
          dateFormat={this.context.i18n.dateFormat}
          value={fromToValue.from ? [
            parseDate(fromToValue.from),
            parseDate(fromToValue.to)
          ] : []}
          onChange={(values) => this.props.setValue({ from: values[0], to: values[1] })}
          onBlur={(e) => this.props.isPristine() && this.props.setValue(this.props.getValue())}
          disabled={this.props.disabled}
          variants={[]}
        />
      </FormGroupMarkup>
    )
  }
}
