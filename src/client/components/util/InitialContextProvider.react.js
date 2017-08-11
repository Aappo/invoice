import React, { Component, Children } from 'react';

/**
 * Set initial context data.
 */
export default class InitialContextProvider extends Component {

  static propTypes = {
    userData: React.PropTypes.object,
    locale: React.PropTypes.string,
    formatPatterns: React.PropTypes.object
  };

  static childContextTypes = {
    userData: React.PropTypes.object.isRequired,
    locale: React.PropTypes.string.isRequired,
    formatPatterns: React.PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      userData: this.props.userData,
      locale: this.props.userData ? this.props.userData.languageid : this.props.locale,
      formatPatterns: this.props.formatPatterns
    };
  };

  render() {
    return Children.only(this.props.children);
  }
}
