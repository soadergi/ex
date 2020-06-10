import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Link from 'weplay-components/Link'

import styles from './GameNavLinks.scss'

const GameNavLinks = ({
  // required props:
  navLinks,
  // optional props:
  className,
  color,
}) => (
  <div className={classNames(
    styles.block,
    className,
    styles[color],
  )}
  >
    {navLinks.map(navLink => (
      <Link
        key={navLink.path}
        exact={navLink.isExact}
        to={navLink.path}
        className={styles.navLink}
        activeClassName={styles.isActive}
      >
        <span>{navLink.name}</span>
      </Link>
    ))}
  </div>
)

GameNavLinks.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    isExact: PropTypes.bool,
  })).isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
}

GameNavLinks.defaultProps = {
  className: '',
  color: '',
}

export default React.memo(GameNavLinks)
