import React, { PropTypes } from 'react';
import { Menu, MenuIcon } from '@opuscapita/react-navigation';
const gridIcon = require('!!raw-loader!@opuscapita/svg-icons/lib/apps.svg');
const personIcon = require('!!raw-loader!@opuscapita/svg-icons/lib/person.svg');
import { Link } from 'react-router';
import messages from './i18n';


const menuTheme = {
  bgColor: '#3b4a56',
  color: '#fff',
  navBgColor: '#67707c',
  navColor: '#fff',
  menuIconNotificationColor: '#fff',
  menuIconNotificationBgColor: '#ec6608',
  navBorderColor: 'transparent',
  navActiveBorderColor: '#ec6608',
  navOverlay: 'dark',
  isNavHoverOverlayDark: true,
  isMenuIconHoverOverlayDark: false
};

const personalDataStyle = {
  padding: '6px 12px',
  whiteSpace: 'nowrap'
};

const personalDataItemsStyle = {
  listStyle: 'none',
  padding: '0',
  textAlign: 'center'
};

const logoUrl = '/invoice/static/img/oc-logo-white.svg';

const Navigation = (props, { i18n, userData, setLocale, router }) => {
  i18n.register('Navigation', messages);

  const getTabIndex = () => {
    let index = 0;

    if(router.location.pathname.indexOf('allTaskList') !== -1) {
      index = 1;
    }

    if(router.location.pathname.indexOf('import') !== -1) {
      index = 2;
    }

    return index;
  };

  return(
    <div id="top-navigation" style={{ zIndex: 9999, position: 'relative' }}>
      <Menu
        appName={i18n.getMessage('Navigation.applicationName')}
        activeItem={getTabIndex()}
        alwaysAtTop={false}
        theme={menuTheme}
        logoSrc={logoUrl}
        logoTitle="OpusCapita"
        logoHref="http://opuscapita.com"
        navigationItems={
          [
            {
              children: i18n.getMessage('Navigation.myInvoices.header'),
              subItems: [
                {
                  children: (
                    <Link to="/invoice/taskList">
                      {i18n.getMessage('Navigation.myInvoices.myTaskList')}
                    </Link>
                  )
                },
                {
                  children: (
                    <Link to="/invoice/processed">
                      {i18n.getMessage('Navigation.myInvoices.processed')}
                    </Link>
                  )
                }
              ]
            },
            {
              children: (
                <div onClick={() => router.push('/invoice/allTaskList')}>
                  {i18n.getMessage('Navigation.allInvoices.header')}
                </div>
              )
            },
            {
              children: (
                <div onClick={() => router.push('/invoice/import')}>
                  {i18n.getMessage('Navigation.import.header')}
                </div>
              )
            },
            { children: i18n.getMessage('Navigation.workflow.header') },
            { children: i18n.getMessage('Navigation.matching.header') },
            { children: i18n.getMessage('Navigation.contracts.header') }
          ]}
        iconsBarItems={
          [
            <MenuIcon svg={gridIcon} title={i18n.getMessage('Navigation.icons.search.label')}/>,

            <MenuIcon svg={personIcon} title={i18n.getMessage('Navigation.icons.user.label')}>
              <div style={personalDataStyle}>
                <h5>{i18n.getMessage('Navigation.userMenu.language.label')}</h5>
                <ul style={personalDataItemsStyle}>
                  <li>
                    <a href="#" onClick={() => setLocale('en')}>
                      {i18n.getMessage('Navigation.userMenu.language.en.label')}
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => setLocale('de')}>
                      {i18n.getMessage('Navigation.userMenu.language.de.label')}
                    </a>
                  </li>
                  <li style={{borderTop: '1px solid #e5e5e5'}}>
                    <a href="/auth/logout">
                      {i18n.getMessage('Navigation.userMenu.logout')}
                    </a>
                  </li>
                </ul>
              </div>
            </MenuIcon>
          ]
        }
      />
    </div>
  );
};

Navigation.contextTypes = {
  i18n: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired
};

export default Navigation;
