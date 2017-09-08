import React from 'react';

import Header from '../Items/Header.react';
import Items from '../Items/Items.react';
import Candidates from '../Items/Candidates.react';

import './MatchingItemsLayout.less';

import { items, candidates } from '../Items/data';


class MatchingItemsLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: new Set([0]),
      selectedCandidates: new Set([0]),
      items: items,
      candidates: candidates,
    };
  }

  setSelectedItems = (items) => {
    this.setState({
      selectedItems: items,
    });
  }

  setSelectedCandidates = (candidates) => {
    this.setState({
      selectedCandidates: candidates,
    });
  }

  match = () => {
    const newItems = this.state.items;
    newItems.splice(0, 1);
    const newCandidates = this.state.candidates;
    newCandidates.splice(0, 1);
    this.setState({
      items: newItems,
      candidates: newCandidates,
    });
  }

  render() {
    return (
      <div id="matching-items">
        <div id="matching-items-header">
          <Header />
        </div>
        <div id="matching-items-content">
          <div id="matching-items-content-list">
            <Items
              items={this.state.items}
              selectedItems={this.state.selectedItems}
              setSelectedItems={this.setSelectedItems}
              handleMatch={this.match}
            />
          </div>
          <div id="matching-items-content-candidates">
            <Candidates
              candidates={this.state.candidates}
              setSelectedCandidates={this.setSelectedCandidates}
            />
          </div>
        </div>
      </div>
    );
  }
}

MatchingItemsLayout.propTypes = {
};

export default MatchingItemsLayout;
