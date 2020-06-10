import PropTypes from 'prop-types'
import React from 'react'

import NavigationItem from './NavigationItem'
import container from './container'
import styles from './styles.scss'

const Navigation = ({
  navigationMenu,
  currentLanguage,
  routeInfo,
}) => (
  <ul className={styles.list}>
    {navigationMenu.map(navigationItem => (
      <NavigationItem
        key={navigationItem.url}
        navigationItem={navigationItem}
        currentLanguage={currentLanguage}
        routeInfo={routeInfo}
      />
    ))}
  </ul>
)

Navigation.propTypes = {
  // required props
  currentLanguage: PropTypes.string.isRequired,
  navigationMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // container props
  routeInfo: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  // optional props
}

export default container(Navigation)
