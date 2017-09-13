import React, { PropTypes } from 'react';
import {
  Menu,
  MenuIcon,
  MenuAccount,
  MenuSelect,
  MenuDropdownGrid
} from '@opuscapita/react-navigation';
const gridIcon = require('!!raw-loader!@opuscapita/svg-icons/lib/apps.svg');
import InvoiceViews from '../../../../common/InvoiceViews';

const userActions = (i18n) => [
  'services',
  'settings',
  'help'
].map(item => ({label: i18n.getMessage(`Navigation.userActions.${item}.label`)}));

const applications = (i18n) => [
  {
    label: i18n.getMessage(`Navigation.applications.shop.label`),
    svg: require('!!raw-loader!@opuscapita/svg-icons/lib/local_mall.svg')
  },
  {
    label: i18n.getMessage(`Navigation.applications.rfq.label`),
    svg: require('!!raw-loader!@opuscapita/svg-icons/lib/monetization_on.svg')
  },
  {
    label: i18n.getMessage(`Navigation.applications.request.label`),
    svg: require('!!raw-loader!@opuscapita/svg-icons/lib/room_service.svg')
  },
  {
    label: i18n.getMessage(`Navigation.applications.order.label`),
    svg: require('!!raw-loader!@opuscapita/svg-icons/lib/insert_drive_file.svg')
  },
  {
    label: i18n.getMessage(`Navigation.applications.invoice.label`),
    svg: require('!!raw-loader!@opuscapita/svg-icons/lib/receipt.svg')
  },
  {
    label: i18n.getMessage(`Navigation.applications.analyze.label`),
    svg: require('!!raw-loader!@opuscapita/svg-icons/lib/trending_up.svg')
  }
];

const renderUserMenuBottomElement = (userData, i18n, setLocale) => (
  <div>
    <div className="oc-menu-account__select-item">
      <span className="oc-menu-account__select-item-label">
        {i18n.getMessage('Navigation.userMenu.language.label')}
      </span>
      <MenuSelect className="oc-menu-account__select-item-select" onChange={(e) => {
        setLocale(e.target.value)
      }}>
        <option value="en">{i18n.getMessage('Navigation.userMenu.language.en.label')}</option>
        <option value="de">{i18n.getMessage('Navigation.userMenu.language.de.label')}</option>
      </MenuSelect>
    </div>
  </div>
);

const logoUrl = '/invoice/static/img/oc-logo-white.svg';

const Navigation = (props, { i18n, userData, setLocale, router }) => {
  const getTabIndex = () => {
    let index = 0;

    if(InvoiceViews.getByPath(router.location.pathname) === InvoiceViews.ALL_TASKS) {
      index = 1;
    }

    if(InvoiceViews.getByPath(router.location.pathname) === InvoiceViews.IMPORT) {
      index = 2;
    }
    return index;
  };

  return (
    <div id="top-navigation" style={{ zIndex: 9999, position: 'relative' }}>
      <Menu
        appName={i18n.getMessage('Navigation.applicationName')}
        activeItem={getTabIndex()}
        alwaysAtTop={false}
        logoSrc={logoUrl}
        logoTitle="OpusCapita"
        logoHref="http://opuscapita.com"
        className="oc-menu--opuscapita-dark-theme"
        navigationItems={
          [
            {
              children: (
                <div onClick={() => router.push(InvoiceViews.MY_TASKS.path)}>
                  {i18n.getMessage('Navigation.myInvoices.header')}
                </div>
              )
            },
            {
              children: (
                <div onClick={() => router.push(InvoiceViews.ALL_TASKS.path)}>
                  {i18n.getMessage('Navigation.allInvoices.header')}
                </div>
              )
            },
            {
              children: (
                <div onClick={() => router.push(InvoiceViews.IMPORT.path)}>
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
            <MenuIcon svg={gridIcon} title={i18n.getMessage('Navigation.icons.search.label')} hideDropdownArrow={true}>
              <MenuDropdownGrid activeItem={4} items={applications(i18n)}/>
            </MenuIcon>,

            <MenuIcon title="Account settings" label={`${userData.firstname}`} hideDropdownArrow={true}>
              <MenuAccount
                firstName={userData.firstname}
                lastName={userData.lastname}
                userName={userData.id}
                initials={`${userData.firstname[0]}${userData.lastname[0]}`}
                avatarSrc={`/invoice/static/img/avatars/${userData.firstname}.${userData.lastname}.png`}
                onLogout={() => window.location = '/auth/logout?backTo=/invoice'}
                actions={userActions(i18n)}
                bottomElement={renderUserMenuBottomElement(userData, i18n, setLocale)}
              />
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
