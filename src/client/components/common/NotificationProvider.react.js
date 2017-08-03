import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';
import lodash from 'lodash';

export default class NotificationProvider extends Component {

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static childContextTypes = {
    showNotification: PropTypes.func.isRequired,
    hideNotification: PropTypes.func.isRequired
  };

  getChildContext() {
    return {
      showNotification: (message, level = 'info', autoDismiss = 2, dismissible = true, attributes = {}) => {
        this.refs.notificationSystem.addNotification(
          {
            uid: lodash.uniqueId('notification_'),
            level,
            autoDismiss,
            dismissible,
            position: 'tc',
            message: this.context.i18n.getMessage(message, attributes)
          }
        )
      },
      hideNotification: () => setTimeout(() => this.refs.notificationSystem.clearNotifications(), 5000)
    }
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <NotificationSystem ref="notificationSystem"/>
        {this.props.children}
      </div>
    )
  }
}
