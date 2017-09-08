import React, { PropTypes } from 'react';
import {
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider, intlReducer } from 'react-intl-redux';
import { datagridReducer } from '@opuscapita/react-grid';
import thunk from 'redux-thunk';

import CandidatesGrid from './CandidatesGrid.react';

import './Candidates.less';

const store = createStore(
  combineReducers({
    intl: intlReducer,
    datagrid: datagridReducer,
  }),
  compose(applyMiddleware(thunk)),
);


export default class CandidateList extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider>
          <div id="candidates">
            <div id="header-row">
              <b>Matching candidates</b>
              <FormGroup
                controlId="formBasicText"
              >
                <FormControl
                  type="text"
                  value=""
                  placeholder="Search new candidates"
                />
              </FormGroup>
            </div>
            <div id="content">
              <CandidatesGrid
                candidates={this.props.candidates}
                setSelectedCandidates={this.props.setSelectedCandidates}
              />
            </div>
          </div>
        </IntlProvider>
      </Provider>
    );
  }
}

CandidateList.propTypes = {
  candidates: PropTypes.array.isRequired,
  setSelectedCandidates: PropTypes.func.isRequired,
};
