import React, { PropTypes, Component } from 'react';
import Formsy from 'formsy-react';
import FormsyTextInput from '../../../common/form-components/FormsyTextInput.react';
import FormsySelect from '../../../common/form-components/FormsySelect.react';

export default class SearchForm extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    statuses: PropTypes.array.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <h1>{this.context.i18n.getMessage('Labels.header')}</h1>
        <div className="form-horizontal">
          <Formsy.Form ref="searchFormMarkup" onSubmit={(model) => this.props.onSearch(model)}>
            <div className="row">
              <div className="col-md-6">
                <FormsyTextInput
                  label="Labels.invoice"
                  name='invoiceReceiptId'
                />
                <FormsySelect
                  label="Labels.status"
                  name='status'
                  values={this.props.statuses}
                  toOptionConverter={
                    (status) => (
                      <option key={status.statusId} value={status.statusId}>{status.description}</option>
                    )
                  }
                  defaultOption={
                    <option value="" defaultValue={true}>{this.context.i18n.getMessage('Labels.all')}</option>
                  }
                />
              </div>
              <div className="col-md-6">
                <FormsyTextInput
                  label="Labels.customer"
                  name='customerId'
                />
              </div>
            </div>
            <div className="form-submit text-right">
              <button className="btn btn-link" type="button"
                onClick={() => this.refs.searchFormMarkup.reset()}
              >
                {this.context.i18n.getMessage('Commands.reset')}
              </button>
              <button className="btn btn-primary" type="submit">
                {this.context.i18n.getMessage('Commands.search')}
              </button>
            </div>
          </Formsy.Form>
        </div>
      </div>
    );
  }
}
