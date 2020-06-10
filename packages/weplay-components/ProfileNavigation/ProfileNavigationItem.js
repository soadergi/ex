import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { useLocation } from 'weplay-singleton/RouterProvider/useLocation'

import Icon from 'weplay-components/Icon'

import NavigationComponent from './NavigationComponent'
import styles from './styles.scss'

const ProfileNavigationItem = ({
  navigationItem,
  handleMenuItemClick,
}) => {
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)

  const isActiveSubItem = useMemo(
    () => Boolean(navigationItem.subItems?.find(subItem => subItem.url === location.pathname)),
    [navigationItem, location.pathname],
  )

  const toggleMenuItem = () => {
    if (navigationItem.subItems) {
      setIsOpen(!isOpen)
    }
  }

  useEffect(() => {
    if (isActiveSubItem) {
      setIsOpen(true)
    }
  }, [isActiveSubItem, setIsOpen])

  return (
    <>
      <NavigationComponent
        toggleMenuItem={toggleMenuItem}
        isOpen={isOpen}
        handleMenuItemClick={handleMenuItemClick}
        navigationItem={navigationItem}
      >
        <div className={classNames(
          styles.wrapper,
          { [styles.premium]: navigationItem.isPremium },
        )}
        >
          <Icon
            iconName={navigationItem.iconName}
            className="u-mr-1"
          />
          <span className={styles.content}>
            {navigationItem.title}
          </span>
          {navigationItem.subItems && (
          <Icon
            iconName="arrow-expand"
            className={styles.icon}
          />
          )}
        </div>
      </NavigationComponent>
      <div>
        {isOpen && navigationItem.subItems && (
        <ul
          className={styles.list}
        >
          {navigationItem.subItems.map(subItem => (
            <li
              key={subItem.title}
              className={styles.item}
            >
              <NavLink
                className={styles.link}
                to={subItem.url}
                activeClassName={styles.isActive}
              >
                {subItem.title}
              </NavLink>
            </li>
          ))}
        </ul>
        )}
      </div>
    </>
  )
}
ProfileNavigationItem.propTypes = {
  // required props
  navigationItem: PropTypes.shape({
    iconName: PropTypes.string,
    isPremium: PropTypes.bool,
    title: PropTypes.string,
    subItems: PropTypes.array,
    url: PropTypes.string,
    lastInCategory: PropTypes.bool,
  }).isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
  // optional props
}

ProfileNavigationItem.defaultProps = {
}

export default React.memo(ProfileNavigationItem)
