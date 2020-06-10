import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './styles.scss'

const NavigationComponent = ({
  navigationItem,
  isOpen,
  toggleMenuItem,
  children,
  handleMenuItemClick,
}) => (navigationItem.subItems ? (
  <Button
    className={classNames(
      styles.accordion,
      { [styles.isOpen]: isOpen },
      { [styles.category]: navigationItem.lastInCategory },
    )}
    onClick={toggleMenuItem}
    priority={BUTTON_PRIORITY.RESET}
    color={BUTTON_COLOR.BLACK}
  >
    {children}
  </Button>
) : (
  <NavLink
    className={classNames(
      styles.itemWrap,
      styles.link,
      { [styles.category]: navigationItem.lastInCategory },
    )}
    activeClassName={styles.isActive}
    to={navigationItem.url}
    onClick={handleMenuItemClick}
  >
    {children}
  </NavLink>
))
NavigationComponent.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  navigationItem: PropTypes.shape({
    iconName: PropTypes.string,
    title: PropTypes.string,
    subItems: PropTypes.array,
    url: PropTypes.string,
    lastInCategory: PropTypes.bool,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleMenuItem: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
  // optional props
}

NavigationComponent.defaultProps = {
}

export default React.memo(NavigationComponent)
