import React, { PropTypes, Component } from 'react';
import ActionTabContent from './ActionTabContent.react';
import './Action.less';

export default class ActionsTabs extends Component {

  static propTypes = {
    invoice: PropTypes.object,
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
      commentary: props.invoice && props.invoice.commentary || '',
      activeTab: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { invoice } = nextProps;
    if (invoice) {
      this.setState({
        commentary: invoice.commentary ? invoice.commentary : '',
        activeTab: 0
      })
    }
  }

  render() {
    const { actions } = this.props;
    const currentAction = actions.length > 0 ? actions[this.state.activeTab] : undefined;
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
          readOnly={!currentAction}
          actionName={currentAction && currentAction.name}
          onAction={() => currentAction && currentAction.handler({ commentary: this.state.commentary })}
          onTextAreaChange={commentary => this.setState({ commentary: commentary })}
          commentary={this.state.commentary}
        />
      </div>
    );
  }
}
