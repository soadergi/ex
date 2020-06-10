import React from 'react'
import PropTypes from 'prop-types'

import LogoutButton from 'weplay-components/UserAuthControlsPortal/LogoutButton/LogoutButton'

import ProfileNavigationItem from './ProfileNavigationItem'
import useProfileNavigation from './useProfileNavigation'
import styles from './styles.scss'

const ProfileNavigation = ({
  handleMenuItemClick,
  isDetailed,
}) => {
  const {
    menuItems,
  } = useProfileNavigation({ isDetailed })
  return (
    <div className={styles.block}>
      {menuItems.map(menuItem => (
        <ProfileNavigationItem
          navigationItem={menuItem}
          key={menuItem.title}
          handleMenuItemClick={handleMenuItemClick}
        />
      ))}
      <LogoutButton
        onClick={handleMenuItemClick}
      />
    </div>
  )
}

ProfileNavigation.propTypes = {
  // required props
  // optional props
  isDetailed: PropTypes.bool,
  handleMenuItemClick: PropTypes.func,
}

ProfileNavigation.defaultProps = {
  isDetailed: false,
  handleMenuItemClick: () => {},
}

export default ProfileNavigation
