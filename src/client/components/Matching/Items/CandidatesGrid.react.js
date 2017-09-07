import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Datagrid, DatagridActions } from '@opuscapita/react-grid';

import columns from './columns';


class CandidatesGrid extends React.Component {

  componentDidMount() {
    const data = [{
      matchPercent: 100,
      orderNro: 24431,
      article: 'Seat belt',
      productID: 'P12375',
      ordered: 34,
      delivered: 34,
      charged: 34,
      unitPrice: 56.45,
      unit: 'Piece',
    }, {
      matchPercent: 100,
      orderNro: 24431,
      article: 'Seat belt',
      productID: 'P12375',
      ordered: 34,
      delivered: 34,
      charged: 34,
      unitPrice: 56.45,
      unit: 'Piece',
    }];
    this.props.gridActions.setData('candidates-grid', data);
  }

  render() {
    return (
      <Datagrid
        id="candidates-grid"
        columns={columns}
      />
    );
  }
}

CandidatesGrid.propTypes = {
  gridActions: PropTypes.shape({
    setData: PropTypes.func.isRequired,
  }),
}

const mapDispatchToProps = dispatch => ({
  gridActions: bindActionCreators(DatagridActions, dispatch),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(CandidatesGrid);
