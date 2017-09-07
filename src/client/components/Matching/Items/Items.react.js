import React from 'react';
import {
  Button,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

import List from '../../MyTasks/select-list/List';
import Item from './Item.react';

import './Items.less';


export default class ItemsList extends React.Component {
  render() {
    return (
      <div id="items-list">
        <div id="matching-actions">
          <b>28 lines left</b>
          <Button>Match</Button>
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
          items={[
            <Item key={0} />,
            <Item key={1} />,
          ]}
          selected={[0]}
          multiple={false}
        />
      </div>
    );
  }
}
