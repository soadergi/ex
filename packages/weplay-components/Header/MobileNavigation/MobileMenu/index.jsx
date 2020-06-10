import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'

import LanguageSwitch from 'weplay-components/LanguageSwitch'
import SocialIcons from 'weplay-components/SocialIcons'

import MenuList from './MenuList'
import container from './container'
import styles from './styles.scss'

const MobileMenu = ({
  // required props
  isOpened,
  closeMenu,
  mobileMenu,
  socialPageLinks,
  // container props
  isMobileTournamentInfoVisible,
  // optional props
  getCustomSubMenu,
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.isOpened]: isOpened,
        [styles.extraPaddingTop]: isMobileTournamentInfoVisible,
      },
    )}
  >
    <ul className={styles.list}>
      {mobileMenu.map(menuItem => (
        <li
          key={menuItem.id}
        >
          <MenuList
            getCustomSubMenu={getCustomSubMenu}
            title={menuItem.localizations.title}
            label={menuItem.localizations.label}
            project={menuItem.project}
            url={menuItem.url}
            closeMobileMenu={closeMenu}
          />
        </li>
      ))}
    </ul>

    <div className={styles.section}>
      <LanguageSwitch />
    </div>

    <div className={styles.section}>
      <SocialIcons
        links={socialPageLinks}
        iconSize="small"
        color="darkGrey"
        withMarginRight
      />
    </div>
  </div>
)

MobileMenu.propTypes = {
  // required props
  isOpened: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  mobileMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  socialPageLinks: PropTypes.arrayOf(socialLinkPropType).isRequired,
  getCustomSubMenu: PropTypes.func.isRequired,
  // container props
  isMobileTournamentInfoVisible: PropTypes.bool.isRequired,
  // optional props
}
MobileMenu.defaultProps = {
  // optional props
}

export default container(MobileMenu)
