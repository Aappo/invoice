import React, { PropTypes } from 'react';
import Navigation from '../components/common/Navigation';
import { OCAlertsProvider } from '@opuscapita/react-alerts';

const Layout = (props, { userData }) => (
  <div className="page-container">
    <Navigation/>
    <OCAlertsProvider/>
    <div className="main-content">
      {props.children}
    </div>
  </div>
);

Layout.contextTypes = {
  userData: PropTypes.object.isRequired
};

export default Layout;
