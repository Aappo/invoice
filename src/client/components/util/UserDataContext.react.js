import React, {PropTypes, PureComponent, Children} from 'react';

export default class UserDataContext extends PureComponent {

  static propTypes = {
    userData: PropTypes.object.isRequired
  };

  static childContextTypes = {
    userData: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      userData: this.props.userData
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}
