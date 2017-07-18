import React, {Component, PropTypes} from 'react';
import withDataHandler from './DataHandler.react';
import WideLayout from './WideLayout.react';
import NarrowLayout from './NarrowLayout.react';
const WideLayoutWithData = withDataHandler(WideLayout);
const NarrowLayoutWithData = withDataHandler(NarrowLayout);
const NARROW_MODE_BREAK_POINT = 860;
import './TaskLayout.less';
import messages from './i18n'


export default class TaskLayoutHandler extends Component {

  state = {
    useNarrow: false,
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  componentDidMount() {
    window.addEventListener('resize', ::this.switchLayout);
    this.switchLayout();
  }

  componentWillMount() {
    this.context.i18n.register('MyTasks', messages);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.switchLayout);
  }

  switchLayout() {
    console.log(window.innerWidth);
    this.setState({
      useNarrow: window.innerWidth < NARROW_MODE_BREAK_POINT
    })
  }

  render() {
    return (
      this.state.useNarrow ?  <NarrowLayoutWithData /> : <WideLayoutWithData />
    );
  }
}
