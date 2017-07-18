import React, { PropTypes } from 'react';
import SidebarMenu from '../components/common/SidebarMenu';
import NotificationProvider from '../components/common/NotificationProvider.react';
import { HeaderMenu } from 'ocbesbn-react-components';

// TODO: Not place NotificationProvider in representational component
const Layout = (props, { userData }) => (
  <div className="page-container">
    <SidebarMenu/>
    <div className="main-content">
      <HeaderMenu currentUserData={userData}/>
      <div className="content-wrap">
        <div className="container">
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
