import React from 'react';
import { Checkbox } from 'react-bootstrap';

import './Item.less';


export default class Item extends React.Component {
  render() {
    return (
      <div>
        <div className="item-row">
          <span className="text">24431</span>
          <span className="text">56.45 EUR / PCS</span>
          <Checkbox checked={true} />
        </div>
        <div className="item-row">
          <span className="text">Seat belt</span>
          <span className="text">34 charged</span>
          <span />
        </div>
        <div className="item-row">
          <span className="text">P12375</span>
          <span className="text">345.30 EUR (total)</span>
          <span />
        </div>
      </div>
    );
  }
}
