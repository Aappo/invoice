import React, { PropTypes, Component } from 'react';
import ActionTabContent from './ActionTabContent.react';
import './Action.less';
import { COMMENTARY_MAX_SIZE } from '../constants';

export default class ActionsTabs extends Component {

  static propTypes = {
    invoice: PropTypes.object.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired
    })).isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      commentary: '',
      activeTab: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    let newState = { commentary: '' };
    if (nextProps.invoice.id !== this.props.invoice.id) {
      newState.activeTab = 0;
    }
    this.setState(newState);
  }

  handleTextAreaChange(commentary) {
    if (commentary.length <= COMMENTARY_MAX_SIZE) {
      this.setState({ commentary });
    }
  }

  render() {
    const { actions } = this.props;
    const currentAction = actions[this.state.activeTab];
    return (
      <div id="actions">
        <div id="header">
          <ul>
            {actions.length > 0 && actions.map((action, idx) => (
              <li key={idx} className={this.state.activeTab === idx ? 'doing' : ''}>
                <a onClick={(e) => this.setState({ activeTab: idx })}>
                  {this.context.i18n.getMessage(`Action.tab.${action.name}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ActionTabContent
          actionName={currentAction.name}
          onAction={() => currentAction.handler({ commentary: this.state.commentary })}
          onTextAreaChange={::this.handleTextAreaChange}
          commentary={this.state.commentary}
        />
      </div>
    );
  }
}
