import React, {Component, PropTypes} from 'react';
import withDataHandler from './DataHandler.react';
import WideLayout from './WideLayout.react';
import NarrowLayout from './NarrowLayout.react';
const NARROW_MODE_BREAK_POINT = 860;
import './TaskLayout.less';
import myTasksMessages from './i18n';
import invoiceEditorMessages from '../InvoiceReceiptEditor/i18n/InvoiceEditor';


export default class TaskLayoutHandler extends Component {

  static propTypes = {
    options: PropTypes.object
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    options: {},
  };

  state = {
    useNarrow: false,
  };

  componentWillMount() {
    this.context.i18n.register('MyTasks', myTasksMessages);
    this.context.i18n.register('InvoiceEditor', invoiceEditorMessages);
  }

  componentDidMount() {
    window.addEventListener('resize', ::this.switchLayout);
    this.switchLayout();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.useNarrow !== this.state.useNarrow;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.switchLayout);
  }

  switchLayout() {
    if (this.refs.taskLayout) {
      this.setState({ useNarrow: window.innerWidth < NARROW_MODE_BREAK_POINT })
    }
  }

  render() {
    return React.createElement(
      withDataHandler(this.state.useNarrow ? NarrowLayout : WideLayout, this.props.options),
      { ref: 'taskLayout' },
      null
    );
  }
}
