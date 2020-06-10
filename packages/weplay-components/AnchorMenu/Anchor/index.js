import { NavHashLink as NavLink } from 'react-router-hash-link'
import React from 'react'
import PropTypes from 'prop-types'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import styles from '../styles.scss'

import container from './container'

const Anchor = ({
  anchor,
  logAnchorClick,
  scrollHandler,
}) => (
  <li
    className={styles.item}
  >
    <NavLink
      to={anchor.link}
      scroll={scrollHandler}
      className={styles.link}
      onClick={logAnchorClick}
      {...anchor.amplitudeEvent && getAnalyticsAttributes({
        'amplitude-action': anchor.amplitudeEvent,
      })}
    >
      {anchor.text}
    </NavLink>
  </li>
)

Anchor.propTypes = {
  logAnchorClick: PropTypes.func.isRequired,
  anchor: PropTypes.shape({
    id: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string,
    amplitudeEvent: PropTypes.string,
  }).isRequired,
  scrollHandler: PropTypes.func.isRequired,
}

export default container(Anchor)
