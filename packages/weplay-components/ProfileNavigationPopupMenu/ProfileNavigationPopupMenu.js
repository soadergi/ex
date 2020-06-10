import * as R from 'ramda'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ProfileNavigation from 'weplay-components/ProfileNavigation/ProfileNavigation'
import GamingProfileNavigationItem from 'weplay-components/ProfileNavigation/GamingProfileNavigationItem'

import container from './container'
import styles from './styles.scss'

const ProfileNavigationPopupMenu = ({
  // required props
  isOpen,
  // container props
  // optional props
  handleClick,
  footer,
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.isOpen]: isOpen,
      },
    )}
  >
    <ul className={styles.list}>
      <GamingProfileNavigationItem handleMenuItemClick={handleClick} />
      <ProfileNavigation handleMenuItemClick={handleClick} />
    </ul>
    {footer}
  </div>
)

ProfileNavigationPopupMenu.propTypes = {
  // required props
  isOpen: PropTypes.bool.isRequired,
  // container props
  handleClick: PropTypes.func,
  // optional props
  footer: PropTypes.node,
}

ProfileNavigationPopupMenu.defaultProps = {
  // optional props
  handleClick: R.always,
  footer: null,
}

export default container(ProfileNavigationPopupMenu)
