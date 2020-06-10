import React from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import Header from 'weplay-components/Header/Header'

import SubMenu from './SubMenu/SubMenu'
import { getSocialLinks } from './_mockedAPI'
import {
  getGlobalMenu,
  getMobileMenu,
} from './mockedAPI'
import ContactUsButtonPortal from './ContactUsButtonPortal/ContactUsButtonPortal'
import classes from './Header.scss'

const getCustomSubMenu = () => null
const MainHeader = ({
  routeInfo,
}) => {
  const { locale } = useLocale()
  const navigationMenu = getGlobalMenu(locale)
  const secondaryMenu = navigationMenu
    .filter(el => routeInfo.project === el.project)[0]
    ?.headerMenu
  const isSubMenuAvailable = Boolean(secondaryMenu?.length)
  return (
    <div className={classes.block}>
      <>
        <Header
          navigationMenu={navigationMenu}
          routeInfo={routeInfo}
          mobileMenu={getMobileMenu(locale)}
          socialPageLinks={getSocialLinks(locale, 'pages')}
          getCustomSubMenu={getCustomSubMenu}
        />
        <ContactUsButtonPortal />
      </>
      {isSubMenuAvailable && (
        <SubMenu
          locale={locale}
          menuList={secondaryMenu}
        />
      )}
    </div>
  )
}

export default withRouteInfo(MainHeader)
