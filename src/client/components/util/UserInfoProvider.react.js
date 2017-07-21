import React, {PropTypes, PureComponent, Children} from 'react';
import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';


const loadCurrentUserData = function () {
  return request.get(`/invoice/api/currentUserData`).set(
    'Accept', 'application/json'
  ).then((response) => (Promise.resolve(response.body))).catch((error) => {
    throw Error(error);
  })
};

export default class UserInfoProvider extends PureComponent {
  static childContextTypes = {
    userData: PropTypes.object.isRequired
  };

  state = {
    userData: {}
  };

  componentDidMount() {
    loadCurrentUserData().then((data) => (this.setState({userData: {...data}})))
  }

  getChildContext() {
    return {
      userData: this.state.userData
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}
