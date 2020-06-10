import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const Tab = ({
  // required props
  // container props
  link,
  logTournamentTabClick,
  // optional props
}) => (
  <div className={styles.block}>
    {link.disabled
      ? (
        <span className={classNames(
          styles.link,
          styles.isDisabled, // TODO: !!!IMPORTANT!!! REMOVE FOR LAN RELEASE!!!
        )}
        >
          {link.title}
        </span>
      )
      : (
        <NavLink
          exact
          className={styles.link}
          to={link.url}
          activeClassName={styles.isActive}
          onClick={logTournamentTabClick}
        >
          {link.title}
        </NavLink>
      )
    }
  </div>
)

Tab.propTypes = {
  // required props
  // container props
  link: PropTypes.PropTypes.shape({}).isRequired,
  logTournamentTabClick: PropTypes.func.isRequired,
  // optional props
}

Tab.defaultProps = {
  // optional props
}

export default container(Tab)
