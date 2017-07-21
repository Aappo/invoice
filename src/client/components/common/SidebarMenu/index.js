import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SupplierMenu from './SupplierMenu.react';
import CustomerMenu from './CustmerMenu.react';

const logoStyle = {
  height: '1.885em',
  margiTop: '-15%',
  marginLeft: '-4%'
};

/**
 * OpusCaputa sidebar menu
 * Parent component should be body (or at least span - otherwise height won't be 100%)
 */
const SidebarMenu = (props, { userData }) => (
  <div className="sidebar-menu toggle-others fixed">
    <div className="sidebar-menu-inner ps-container ps-active-y">
      <header className="logo-env">
        <div className="logo">
          <Link to="/invoice" className="logo-expanded hidden-collapsed">
            <img src="/invoice/static/img/oc-logo-white.svg" style={logoStyle}/>
          </Link>
        </div>
        <div className="mobile-menu-toggle visible-xs">
          <a href="#" data-toggle="mobile-menu">
            <i className="fa-bars"></i>
          </a>
        </div>
      </header>
        {userData.supplierid? <SupplierMenu/> : userData.customerid? <CustomerMenu/> : null}
      <div className="ps-scrollbar-x-rail" style={{left: 0, bottom: 3}}>
        <div className="ps-scrollbar-x" style={{left: 0, width: 0}}></div>
      </div>
      <div className="ps-scrollbar-y-rail" style={{top: 0, height: 412, right: 2}}>
        <div className="ps-scrollbar-y" style={{top: 0, height: 389}}></div>
      </div>
    </div>
  </div>
);




SidebarMenu.contextTypes = {
  userData: PropTypes.object.isRequired
};

// <img src="/invoice/static/img/oc-logo-white.svg" style={{ height: '1.4em' }}/>

export default SidebarMenu;
