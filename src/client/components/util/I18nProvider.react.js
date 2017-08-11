import React, { PropTypes, Component } from 'react';
import { I18nManager } from '@opuscapita/i18n';

export default class I18nProvider extends Component {

  static contextTypes = {
    locale: React.PropTypes.string,
    formatPatterns: React.PropTypes.object
  };

  static childContextTypes = {
    i18n: React.PropTypes.object.isRequired,
    setLocale: React.PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      i18n: new I18nManager(context.locale, context.formatPatterns)
    };
  }

  setLocale(locale) {
    if (locale !== this.state.i18n.locale) {
      this.setState({ i18n: new I18nManager(locale, this.context.formatPatterns) });
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
