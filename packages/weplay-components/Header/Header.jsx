import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'

import NotConnectedLink from 'weplay-components/Link/NotConnectedLink'
import LanguageSwitcher from 'weplay-components/LanguageSwitcher'
import Logo from 'weplay-components/Logo'

import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'
import styles from './Header.scss'

const Header = ({
  // required props
  routeInfo,
  navigationMenu,
  socialPageLinks,
  getCustomSubMenu,
  // container props
  // optional props
}) => {
  const { locale } = useLocale()
  return (
    <header className={classNames(
      styles.block,
    )}
    >
      <div
        className={classNames(
          styles.column,
          styles.mobileNavigation,
        )}
      >
        <MobileNavigation
          mobileMenu={navigationMenu}
          socialPageLinks={socialPageLinks}
          getCustomSubMenu={getCustomSubMenu}
          locale={locale}
        />
      </div>

      <NotConnectedLink
        locale={locale}
        to="/"
        className={classNames(
          styles.column,
          styles.mainPageLink,
        )}
      >
        <Logo />
      </NotConnectedLink>

      <div className={classNames(
        styles.column,
        styles.navigation,
      )}
      >
        <Navigation
          currentLanguage={locale}
          routeInfo={routeInfo}
          navigationMenu={navigationMenu}
        />
      </div>

      <div className={classNames(
        styles.column,
        styles.language,
      )}
      >
        <LanguageSwitcher currentLanguage={locale} />
      </div>
      <div className={classNames(
        styles.column,
        styles.last,
      )}
      >
        <div
          className={styles.user}
          id="UserAuthControlsPortal"
        />
        <div
          className={styles.events}
          id="ProTournamentBlockPortal"
        />
      </div>
    </header>
  )
}

Header.propTypes = {
  // required props
  navigationMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  socialPageLinks: PropTypes.arrayOf(socialLinkPropType).isRequired,
  getCustomSubMenu: PropTypes.func.isRequired,
  // container props
  routeInfo: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  // optional props
}

Header.defaultProps = {
  // optional props
}

export default React.memo(Header)
