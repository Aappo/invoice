import React, {Component, PropTypes} from 'react';
import withDataHandler from '../DataHandler.react';
import WideLayout from './WideLayout.react';
import NarrowLayout from './NarrowLayout.react';
import './TaskLayout.less';
import { withRouter } from 'react-router';
const NARROW_MODE_BREAK_POINT = 860;


export default class TaskListLayoutHandler extends Component {

  static propTypes = {
    fetcher: PropTypes.func.isRequired,
    filter: PropTypes.func,
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  state = {
    useNarrow: false,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    //optimization for odd rerendering - as component is descendant to Layout component
    //in layout there are possible set state calls
    if(nextContext.i18n.locale !== this.context.i18n.locale) {
      return true;
    }

    if(nextState.useNarrow !== this.state.useNarrow) {
      return true;
    }

    return false;
  }

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
    return React.createElement(
      withRouter(withDataHandler(this.state.useNarrow ? NarrowLayout : WideLayout, { fetcher: this.props.fetcher, filter: this.props.filter })),
      { ...this.props },
      null
    );
  }
}
