import React, { PropTypes } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

import List from '../../MyTasks/select-list/List';
import Item from './Item.react';

import './Items.less';


export default class ItemsList extends React.Component {

  onSelectionChange = (selected) => {
    const items = this.props.selectedItems;
    if (items.has(selected)) {
      items.delete(selected);
      this.props.setSelectedItems(items);
    } else {
      items.add(selected);
      this.props.setSelectedItems(items);
    }
  }

  handleFocusChange = (selected) => {
    console.log('focus change:', selected);
  }

  render() {
    const items = this.props.items.map((item) => (
      <Item
        key={item}
        id={item}
        selected={this.props.selectedItems.has(item)}
        setSelected={this.onSelectionChange}
      />
    ));

    return (
      <div id="items-list">
        <div id="matching-actions">
          <b>28 lines left</b>
          <Button onClick={this.props.handleMatch}>Match</Button>
        </div>
        <FormGroup
          controlId="formBasicText"
        >
          <FormControl
            type="text"
            value=""
            placeholder="Search"
          />
        </FormGroup>
        <List
          items={items}
          selected={[0]}
          multiple={false}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.object.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
  handleMatch: PropTypes.func.isRequired,
};
