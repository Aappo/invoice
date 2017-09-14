import React, { Component } from 'react';
import WideLayout from './WideLayout.react';
import NarrowLayout from './NarrowLayout.react';
import './TaskLayout.less';
const NARROW_MODE_BREAK_POINT = 860;

/**
 * Component is responsible only for swapping narrow and wide layouts depending on window size.
 */
export default class LayoutHandler extends Component {

  state = {
    useNarrow: false,
  };

  componentDidMount() {
    window.addEventListener('resize', ::this.switchLayout);
    this.switchLayout();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.switchLayout);
  }

  switchLayout() {
    // Change useNarrow only if innerWidth crosses NARROW_MODE_BREAK_POINT
    if ((this.state.useNarrow && window.innerWidth >= NARROW_MODE_BREAK_POINT)
      || (!this.state.useNarrow && window.innerWidth < NARROW_MODE_BREAK_POINT)) {
      this.setState({ useNarrow: !this.state.useNarrow });
    }
  }

  render() {
    // All props just passed through to inner layout
    return React.createElement(this.state.useNarrow ? NarrowLayout : WideLayout, { ...this.props }, null);
  }
}
