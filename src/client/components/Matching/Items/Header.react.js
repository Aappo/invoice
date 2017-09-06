import React from 'react';
import { Icon } from '@opuscapita/react-icons';

import './Header.less';


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
    };
  }

  selectTab = (tabIndex) => {
    this.setState({
      selectedTab: tabIndex,
    });
  }

  render() {
    return (
      <div id="header-content">
        <Icon type="indicator" name="arrowLeft" />
        <span className="item-bold">SupplierName</span>
        <span className="item">Matching difference: Net -12.80 EUR</span>
        <span className="item">
          <ul>
            <li key={1} className={this.state.selectedTab === 1 ? 'doing' : ''}>
              <a id={1} href="" onClick={(e) => {
                e.preventDefault();
                this.selectTab(1);
              }}
              >
                Unmatched
              </a>
            </li>
            <li key={2} className={this.state.selectedTab === 2 ? 'doing' : ''}>
              <a id={2} href="" onClick={(e) => {
                e.preventDefault();
                this.selectTab(2);
              }}
              >
                Matched
              </a>
            </li>
            <li key={3} className={this.state.selectedTab === 3 ? 'doing' : ''}>
              <a id={3} href="" onClick={(e) => {
                e.preventDefault();
                this.selectTab(3);
              }}
              >
                All
              </a>
            </li>
          </ul>
        </span>
      </div>
    );
  }
}

Header.propTypes = {
};

export default Header;
