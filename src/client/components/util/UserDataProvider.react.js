import React, { Component, Children } from 'react';

/**
 * Set initial UserData to context.
 */
export default class UserDataProvider extends Component {

  static propTypes = {
    userData: React.PropTypes.object
  };

  static childContextTypes = {
    userData: React.PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      userData: this.props.userData
    };
  };

  render() {
    return Children.only(this.props.children);
  }
}
