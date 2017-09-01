import React, { PropTypes } from 'react';
import Navigation from '../components/common/Navigation';
import NotificationProvider from '../components/common/NotificationProvider.react';
import { HeaderMenu } from 'ocbesbn-react-components';

// TODO: Not place NotificationProvider in representational component
const Layout = (props, { userData }) => (
  <div className="page-container">
    <Navigation/>
    <div className="main-content">
      <div className="content-wrap">
        <div className="container-fluid">
          <NotificationProvider>
            {props.children}
          </NotificationProvider>
        </div>
      </div>
    </div>
  </div>
);

Layout.contextTypes = {
  userData: PropTypes.object.isRequired
};

export default Layout;
