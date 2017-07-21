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

  static propTypes = {
    assignedToMe: PropTypes.bool
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    assignedToMe: false,
  };

  state = {
    useNarrow: false,
  };

  componentWillMount() {
    this.context.i18n.register('MyTasks', messages);
  }

  componentDidMount() {
    window.addEventListener('resize', ::this.switchLayout);
    this.switchLayout();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.switchLayout);
  }

  switchLayout() {
    // console.log(window.innerWidth);
    this.setState({
      useNarrow: window.innerWidth < NARROW_MODE_BREAK_POINT
    })
  }

  render() {
    const { assignedToMe } = this.props;
    return (
      this.state.useNarrow ?
        <NarrowLayoutWithData assignedToMe={assignedToMe} /> : <WideLayoutWithData assignedToMe={assignedToMe} />
    );
  }
}
