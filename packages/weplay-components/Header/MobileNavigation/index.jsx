import React from 'react'
import PropTypes from 'prop-types'
import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'

import MenuButton from './MenuButton/MenuButton'
import MobileMenu from './MobileMenu'
import container from './container'
import styles from './styles.scss'

const MobileNavigation = ({
  // required props
  locale,
  mobileMenu,
  socialPageLinks,
  // container props
  isMobileWidth,
  isMenuOpened,
  toggleMenu,
  closeMenu,
  isTabletWidth,
  // optional props
  getCustomSubMenu,
}) => isTabletWidth && (
  <div className={styles.block}>
    <MenuButton
      isMenuOpened={isMenuOpened}
      onClick={toggleMenu}
    />

    <MobileMenu
      mobileMenu={mobileMenu}
      socialPageLinks={socialPageLinks}
      isOpened={isMenuOpened}
      closeMenu={closeMenu}
      currentLanguage={locale}
      isMobileWidth={isMobileWidth}
      getCustomSubMenu={getCustomSubMenu}
    />
  </div>
)

MobileNavigation.propTypes = {
  // required props
  locale: PropTypes.string.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  isMobileWidth: PropTypes.bool.isRequired,
  isTabletWidth: PropTypes.bool.isRequired,
  mobileMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  socialPageLinks: PropTypes.arrayOf(socialLinkPropType).isRequired,
  // container props
  // optional props
  getCustomSubMenu: PropTypes.func,
}

MobileNavigation.defaultProps = {
  // optional props
  getCustomSubMenu: () => null,
}

export default container(MobileNavigation)
