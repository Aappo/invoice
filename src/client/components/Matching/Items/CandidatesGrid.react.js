import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Datagrid, DatagridActions } from '@opuscapita/react-grid';
import { List } from 'immutable';

import columns from './columns';

const GRID_ID = 'candidates-grid';


class CandidatesGrid extends React.Component {
  componentDidMount() {
    this.props.gridActions.setData(GRID_ID, this.props.candidates);
    this.props.gridActions.itemSelectionChange(GRID_ID, 0, ['orderNro']);
  }

  componentWillReceiveProps(nextProps) {
    this.props.gridActions.setData(GRID_ID, this.props.candidates);
    this.props.setSelectedCandidates(new Set(nextProps.selectedItems.toJS()));
  }

  render() {
    return (
      <Datagrid
        id={GRID_ID}
        idKeyPath={['orderNro']}
        columns={columns}
        rowSelect={true}
        rowSelectCheckboxColumn={true}
      />
    );
  }
}

CandidatesGrid.propTypes = {
  candidates: PropTypes.array.isRequired,
  gridActions: PropTypes.shape({
    setData: PropTypes.func.isRequired,
    itemSelectionChange: PropTypes.func.isRequired,
  }),
  setSelectedCandidates: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  selectedItems: state.datagrid.getIn([GRID_ID, 'selectedItems'], List()),
});

const mapDispatchToProps = dispatch => ({
  gridActions: bindActionCreators(DatagridActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CandidatesGrid);
