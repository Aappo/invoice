import React, { PropTypes, Component } from 'react';
import { I18nManager } from '@opuscapita/i18n';
import messages from '../../i18n';

const DEFAULT_LOCALE = 'en';

export default class I18nProvider extends Component {

  static propTypes = {
    formatPatterns: PropTypes.object.isRequired
  };

  static contextTypes = {
    userData: PropTypes.object.isRequired
  };

  static childContextTypes = {
    i18n: PropTypes.object.isRequired,
    setLocale: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      i18n: this.registerMessages(new I18nManager({
        locale: context.userData.languageid? this.context.userData.languageid : DEFAULT_LOCALE,
        localeFormattingInfo: props.formatPatterns,
        fallbackLocale: DEFAULT_LOCALE
      }))
    };
  }

  setLocale(locale) {
    if (locale && locale !== this.state.i18n.locale) {
      this.setState({
        i18n: this.registerMessages(new I18nManager({
          locale,
          localeFormattingInfo: this.props.formatPatterns,
          fallbackLocale: DEFAULT_LOCALE
        }))
      });
    }
  }

  registerMessages(i18nManager) {
    Object.keys(messages).forEach(key => i18nManager.register(key, messages[key]));
    return i18nManager;
  }

  getChildContext() {
    return {
      i18n: this.state.i18n,
      setLocale: ::this.setLocale,
    };
  };

  render() {
    return React.Children.only(this.props.children);
  }
}
