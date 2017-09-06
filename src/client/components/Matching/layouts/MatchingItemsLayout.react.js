import React from 'react';

import Header from '../Items/Header.react';
import Items from '../Items/Items.react';
import Candidates from '../Items/Candidates.react';

import './MatchingItemsLayout.less';


const MatchingItemsLayout = () => {
  return (
    <div id="matching-items">
      <div id="matching-items-header">
        <Header />
      </div>
      <div id="matching-items-content">
        <div id="matching-items-content-list">
          <Items />
        </div>
        <div id="matching-items-content-candidates">
          <Candidates />
        </div>
      </div>
    </div>
  );
};

MatchingItemsLayout.propTypes = {
};

export default MatchingItemsLayout;
