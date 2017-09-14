import React, { PropTypes, Component } from 'react';
import { I18nManager } from '@opuscapita/i18n';
import messages from '../../i18n';

const DEFAULT_LOCALE = 'en';

export default class I18nProvider extends Component {

  static propTypes = {
    formatPatterns: PropTypes.object
  };

  static defaultProps = {
    formatPatterns: require('./formatPatterns.json')
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
      i18n: new I18nManager({
        locale: context.userData.languageid? this.context.userData.languageid : DEFAULT_LOCALE,
        localeFormattingInfo: props.formatPatterns,
        fallbackLocale: DEFAULT_LOCALE
      }).register('invoice', messages)
    };
  }

  setLocale(locale) {
    if (locale && locale !== this.state.i18n.locale) {
      this.setState({
        i18n: new I18nManager({
          locale,
          localeFormattingInfo: this.props.formatPatterns,
          fallbackLocale: DEFAULT_LOCALE
        }).register('invoice', messages)
      });
    }
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
